import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getKBRules } from "@/lib/knowledge-base";
import { DrawingType, Language, KBRule } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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
    return `Sen projektif çizim analizi, özellikle House-Tree-Person (HTP) testi konusunda uzmanlaşmış bir çocuk psikoloğusun. ${childAge} yaşındaki bir çocuğun ${drawingTypeNames[drawingType][language]} çizimini analiz ediyorsun.

⚠️ KRİTİK: TÜM YANITLARIN TÜRKÇE OLMALI. İngilizce kelime kullanma.

ÖNEMLİ KURALLAR:
1. Yorumlarını YALNIZCA aşağıdaki akademik bilgi tabanına dayandır
2. Kesin tanı ifadeleri KULLANMA
3. Yumuşatıcı dil kullan ("gösterebilir", "işaret edebilir", "yansıtıyor olabilir")
4. Çocuğun gelişim evresini (${childAge} yaş) dikkate al
5. Her yorum için güven seviyesi belirt (yüksek/orta/düşük)
6. Her yorum için kaynak göster
7. Akademik kaynaklar çeliştiğinde alternatif yorumları belirt

AKADEMİK BİLGİ TABANI:
${rulesText}

Çizimi analiz et ve YALNIZCA şu JSON formatında yanıt ver:
{
  "interpretations": [
    {
      "element": "öğe adı (Türkçe)",
      "observation": "çizimde gözlemlenen (Türkçe)",
      "interpretation": "psikolojik yorum - yumuşatıcı dille (Türkçe)",
      "confidence": "high" | "moderate" | "low",
      "boundingBox": [ymin, xmin, ymax, xmax],
      "sources": [{"author": "Yazar Adı", "year": 1234}],
      "alternativeViews": [{"interpretation": "alternatif yorum (Türkçe)", "source": {"author": "Yazar", "year": 1234}}]
    }
  ],
  "summary": "Analizin kısa özeti - 2-3 cümle (Türkçe)",
  "spatialAnalysis": "Öğelerin kağıt üzerindeki konumu ve birbirlerine göre durumu (Türkçe)",
  "recommendations": ["öneri 1 (Türkçe)", "öneri 2 (Türkçe)"],
  "developmentalNotes": "Yaşa uygun gelişim notları (Türkçe)"
}

Bounding box koordinatları [0-1000] aralığında normalize edilmelidir. Sadece çizimde açıkça görünen öğeleri analiz et.`;
  }

  return `You are an expert child psychologist specializing in projective drawing analysis, particularly the House-Tree-Person (HTP) test. You are analyzing a ${drawingTypeNames[drawingType][language]} drawing by a ${childAge}-year-old child.

IMPORTANT: All responses must be in English.

IMPORTANT GUIDELINES:
1. Base your interpretations ONLY on the academic knowledge base provided below
2. Never make definitive diagnostic statements
3. Use hedging language ("may indicate", "could suggest", "potentially reflects")
4. Consider the child's developmental stage (age ${childAge})
5. Provide confidence levels (high/moderate/low) for each interpretation
6. Include source citations for every interpretation
7. Note alternative interpretations when academic sources disagree

ACADEMIC KNOWLEDGE BASE:
${rulesText}

Analyze the drawing and respond in this exact JSON format:
{
  "interpretations": [
    {
      "element": "element name",
      "observation": "what you observe in the drawing",
      "interpretation": "psychological interpretation with hedging language",
      "confidence": "high" | "moderate" | "low",
      "boundingBox": [ymin, xmin, ymax, xmax],
      "sources": [{"author": "Name", "year": 1234}],
      "alternativeViews": [{"interpretation": "...", "source": {"author": "Name", "year": 1234}}]
    }
  ],
  "summary": "Brief overall summary of the analysis (2-3 sentences)",
  "spatialAnalysis": "Spatial positioning of elements on paper",
  "recommendations": ["recommendation 1", "recommendation 2"],
  "developmentalNotes": "Notes about age-appropriate expectations"
}

Bounding box coordinates should be normalized [0-1000]. Analyze only elements that are clearly visible in the drawing.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, mimeType, childAge, drawingType, language } = body;

    if (!imageBase64 || !mimeType || !childAge || !drawingType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const kbRules = getKBRules(drawingType as DrawingType);
    const prompt = buildPrompt(
      childAge,
      drawingType,
      kbRules,
      (language as Language) || "tr"
    );

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: imageBase64,
        },
      },
    ]);

    const response = result.response;
    const text = response.text();

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse response as JSON");
    }

    const analysisResult = JSON.parse(jsonMatch[0]);

    return NextResponse.json(analysisResult);
  } catch (error: unknown) {
    console.error("Analysis API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Analysis failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
