import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getKBRulesForAnalysis } from "@/lib/knowledge-base";
import { getAdminAuth } from "@/lib/firebase-admin";
import { DrawingType, Language, KBRule } from "@/types";

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter (per user UID, resets every 60 s)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------
function buildPrompt(
  childAge: number,
  drawingType: string,
  kbRules: KBRule[],
  language: Language
): string {
  const rulesText = kbRules
    .map(
      (rule) =>
        `- ${rule.element}: ${rule.interpretation[language]} (${rule.sources
          .map((s) => `${s.author}, ${s.year}`)
          .join("; ")})`
    )
    .join("\n");

  const drawingTypeNames: Record<string, { tr: string; en: string }> = {
    house: { tr: "Ev", en: "House" },
    tree: { tr: "Ağaç", en: "Tree" },
    person: { tr: "İnsan", en: "Person" },
    full_htp: { tr: "Tam HTP (Ev-Ağaç-İnsan)", en: "Full HTP (House-Tree-Person)" },
  };

  if (language === "tr") {
    return `Sen projektif çizim analizi, özellikle House-Tree-Person (HTP) testi konusunda uzmanlaşmış bir akademik danışmansın. ${childAge} yaşındaki bir çocuğun ${drawingTypeNames[drawingType]?.tr ?? drawingType} çizimini analiz ediyorsun.

⚠️ KRİTİK: TÜM YANITLARIN TÜRKÇE OLMALI.

ÖNEMLİ KURALLAR:
1. Yorumlarını YALNIZCA aşağıdaki akademik bilgi tabanına dayandır
2. Kesin tanı veya klinik yargı ifadeleri KULLANMA
3. Yumuşatıcı dil kullan ("gösterebilir", "dikkat çekebilir", "değerlendirmeye değer olabilir")
4. ${childAge} yaş için gelişimsel normları mutlaka dikkate al — bu yaşta beklenen çizim özelliklerini belirt
5. Her yorum için güven seviyesi belirt (high/moderate/low)
6. Her yorum için kaynak göster
7. Kaynaklar çeliştiğinde alternatif yorumları belirt
8. "Travma", "dissosiyasyon", "paranoia" gibi klinik klinik terimleri doğrudan kullanma; bunun yerine "uzman değerlendirmesi önerilebilir" gibi ifadeler kullan

AKADEMİK BİLGİ TABANI:
${rulesText}

Çizimi analiz et ve YALNIZCA şu JSON formatında yanıt ver:
{
  "interpretations": [
    {
      "element": "öğe adı (Türkçe)",
      "observation": "çizimde gözlemlenen (Türkçe)",
      "interpretation": "gelişimsel bağlamı olan gözlem — yumuşatıcı dille (Türkçe)",
      "confidence": "high" | "moderate" | "low",
      "boundingBox": [ymin, xmin, ymax, xmax],
      "sources": [{"author": "Yazar Adı", "year": 1234}],
      "alternativeViews": [{"interpretation": "alternatif yorum (Türkçe)", "source": {"author": "Yazar", "year": 1234}}]
    }
  ],
  "summary": "Analizin kısa özeti — gelişimsel bağlamı içeren 2-3 cümle (Türkçe)",
  "spatialAnalysis": "Öğelerin kağıt üzerindeki konumu (Türkçe)",
  "recommendations": ["öneri 1 (Türkçe)", "öneri 2 (Türkçe)"],
  "developmentalNotes": "${childAge} yaş için gelişimsel beklentiler ve bu çizimin bu bağlamdaki değerlendirmesi (Türkçe)"
}

Bounding box koordinatları [0-1000] aralığında normalize edilmelidir. Sadece çizimde açıkça görünen öğeleri analiz et.`;
  }

  return `You are an academic consultant specializing in projective drawing analysis, particularly the House-Tree-Person (HTP) test. You are analyzing a ${drawingTypeNames[drawingType]?.en ?? drawingType} drawing by a ${childAge}-year-old child.

IMPORTANT GUIDELINES:
1. Base interpretations ONLY on the academic knowledge base provided below
2. Never make definitive diagnostic or clinical judgments
3. Use hedging language ("may suggest", "worth noting", "could indicate")
4. Consider and explicitly state developmental norms for age ${childAge} in every interpretation
5. Provide confidence levels (high/moderate/low) for each interpretation
6. Include source citations for every interpretation
7. Note alternative interpretations when sources disagree
8. Avoid direct clinical labels like "trauma" or "dissociation"; use "pattern worth professional attention" instead

ACADEMIC KNOWLEDGE BASE:
${rulesText}

Analyze the drawing and respond in this exact JSON format:
{
  "interpretations": [
    {
      "element": "element name",
      "observation": "what you observe in the drawing",
      "interpretation": "developmental-context-aware observation with hedging language",
      "confidence": "high" | "moderate" | "low",
      "boundingBox": [ymin, xmin, ymax, xmax],
      "sources": [{"author": "Name", "year": 1234}],
      "alternativeViews": [{"interpretation": "...", "source": {"author": "Name", "year": 1234}}]
    }
  ],
  "summary": "Brief developmental-context-aware summary (2-3 sentences)",
  "spatialAnalysis": "Spatial positioning of elements on paper",
  "recommendations": ["recommendation 1", "recommendation 2"],
  "developmentalNotes": "Age-${childAge} developmental expectations and how this drawing relates"
}

Bounding box coordinates should be normalized [0-1000]. Analyze only elements clearly visible in the drawing.`;
}

// ---------------------------------------------------------------------------
// POST /api/analyze
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // 1. Authentication — require Firebase ID token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "AUTH_REQUIRED", message: "Kimlik doğrulaması gereklidir." },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    let userId: string;

    try {
      const adminAuth = getAdminAuth();
      const decoded = await adminAuth.verifyIdToken(token);
      userId = decoded.uid;
    } catch {
      return NextResponse.json(
        { error: "AUTH_INVALID", message: "Geçersiz veya süresi dolmuş oturum. Lütfen yeniden giriş yapın." },
        { status: 401 }
      );
    }

    // 2. Rate limiting — 10 requests / user / 60 s
    if (!checkRateLimit(userId)) {
      return NextResponse.json(
        { error: "RATE_LIMITED", message: "Çok fazla istek. Lütfen bir dakika bekleyip tekrar deneyin." },
        { status: 429 }
      );
    }

    // 3. Input validation
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Geçersiz istek gövdesi." },
        { status: 400 }
      );
    }

    const { imageBase64, mimeType, childAge, drawingType, language } = body;

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Görüntü verisi eksik veya geçersiz." },
        { status: 400 }
      );
    }
    // ~10 MB upper bound in base64 (~13.3 MB encoded)
    if (imageBase64.length > 14 * 1024 * 1024) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Görüntü dosyası çok büyük (maks. 10 MB)." },
        { status: 400 }
      );
    }
    if (!mimeType || !["image/jpeg", "image/png", "image/webp"].includes(String(mimeType))) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Desteklenmeyen görüntü formatı. JPEG, PNG veya WebP kullanın." },
        { status: 400 }
      );
    }

    const age = Number(childAge);
    if (!Number.isInteger(age) || age < 4 || age > 14) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Yaş 4-14 arasında tam sayı olmalıdır." },
        { status: 400 }
      );
    }

    const validDrawingTypes = ["house", "tree", "person", "full_htp"];
    if (!drawingType || !validDrawingTypes.includes(String(drawingType))) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Geçersiz çizim türü." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "SERVICE_UNAVAILABLE", message: "Analiz servisi henüz yapılandırılmamış." },
        { status: 503 }
      );
    }

    // 4. Age-appropriate knowledge base rules
    const kbRules = getKBRulesForAnalysis(age, drawingType as DrawingType);
    const lang = (language as Language) || "tr";
    const prompt = buildPrompt(age, drawingType as string, kbRules, lang);

    // 5. Gemini multimodal analysis
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType: String(mimeType), data: String(imageBase64) } },
    ]);

    const text = result.response.text();

    // 6. Parse and structurally validate the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI yanıtı ayrıştırılamadı. Lütfen tekrar deneyin.");
    }

    const analysisResult = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(analysisResult.interpretations)) {
      throw new Error("AI yanıtı beklenen formatta değil.");
    }

    return NextResponse.json(analysisResult);
  } catch (error: unknown) {
    console.error("Analysis API error:", error);
    const msg = error instanceof Error ? error.message : "Bilinmeyen hata";
    return NextResponse.json(
      { error: "INTERNAL_ERROR", message: `Analiz başarısız: ${msg}` },
      { status: 500 }
    );
  }
}
