"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FullPageLoading, Loading } from "@/components/ui/Loading";
import { InterpretationCard } from "@/components/analysis/InterpretationCard";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { analyzeDrawing } from "@/lib/gemini";
import { getKBRules } from "@/lib/knowledge-base";
import { preprocessDrawing } from "@/lib/image-processor";
import { DrawingType, Language, Interpretation } from "@/types";

export default function AnalyzePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState<"upload" | "analyzing" | "results">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [processedPreview, setProcessedPreview] = useState<string>("");
  const [childAge, setChildAge] = useState(7);
  const [drawingType, setDrawingType] = useState<DrawingType>("house");
  const [language, setLanguage] = useState<Language>("tr");
  const [anonymize, setAnonymize] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<{
    interpretations: Interpretation[];
    summary: string;
    spatialAnalysis?: string;
    recommendations: string[];
    developmentalNotes?: string;
  } | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [selectedBox, setSelectedBox] = useState<[number, number, number, number] | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        if (!selectedFile.type.startsWith("image/")) {
          setError("Lütfen bir görsel dosyası seçin.");
          return;
        }
        if (selectedFile.size > 10 * 1024 * 1024) {
          setError("Dosya boyutu 10MB'dan küçük olmalıdır.");
          return;
        }
        
        try {
          const { originalBase64, processedBase64 } = await preprocessDrawing(selectedFile);
          setFile(selectedFile);
          setPreview(originalBase64);
          setProcessedPreview(processedBase64);
          setError("");
        } catch (err) {
          console.error("Image processing error:", err);
          setError("Görüntü işlenirken bir hata oluştu.");
        }
      }
    },
    []
  );

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      try {
        const { originalBase64, processedBase64 } = await preprocessDrawing(droppedFile);
        setFile(droppedFile);
        setPreview(originalBase64);
        setProcessedPreview(processedBase64);
        setError("");
      } catch (err) {
        setError("Görüntü işlenirken bir hata oluştu.");
      }
    }
  }, []);

  const handleAnalyze = async () => {
    if (!file || !user) return;

    if (!storage || !db) {
      setError("Firebase yapılandırması eksik. Lütfen yöneticiyle iletişime geçin.");
      return;
    }

    setAnalyzing(true);
    setStep("analyzing");
    setError("");

    try {
      // Upload image to Firebase Storage (Original image)
      const storageRef = ref(
        storage,
        `drawings/${user.uid}/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      // Get base64 for Gemini (Processed image for better accuracy)
      const base64 = processedPreview.split(",")[1];
      const mimeType = "image/jpeg"; // Processed image is jpeg

      // Get KB rules
      const kbRules = getKBRules(drawingType);

      // Analyze with Gemini
      const analysisResult = await analyzeDrawing(
        base64,
        mimeType,
        childAge,
        drawingType,
        kbRules,
        language
      );

      // Save to Firestore
      const docRef = await addDoc(collection(db, "analyses"), {
        userId: anonymize ? "anonymous" : user.uid,
        imageUrl,
        childAge,
        drawingType,
        language,
        interpretations: analysisResult.interpretations,
        summary: analysisResult.summary,
        spatialAnalysis: analysisResult.spatialAnalysis,
        recommendations: analysisResult.recommendations,
        developmentalNotes: analysisResult.developmentalNotes,
        createdAt: serverTimestamp(),
        isAnonymized: anonymize,
      });

      setSavedId(docRef.id);
      setResults(analysisResult);
      setStep("results");
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      setStep("upload");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setResults(null);
    setSavedId(null);
    setStep("upload");
    setError("");
  };

  if (authLoading) {
    return <FullPageLoading text="Yükleniyor..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-lg font-bold text-gray-900">NIDA</span><span className="hidden md:inline text-xs text-gray-400 font-normal ml-1">Native Interpretive Drawing Analysis</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                ← Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Çizim Analizi
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {step === "upload" && (
          <div className="space-y-6">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle>1. Çizimi Yükle</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    preview
                      ? "border-indigo-300 bg-indigo-50"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  {preview ? (
                    <div className="space-y-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-sm"
                      />
                      <p className="text-sm text-gray-600">{file?.name}</p>
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        Değiştir
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-5xl">📤</div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Çizimi buraya sürükleyin
                        </p>
                        <p className="text-sm text-gray-500">
                          veya dosya seçmek için tıklayın
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        <label
                          htmlFor="file-upload"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          Dosya Seç
                        </label>
                        <label
                          htmlFor="camera-upload"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer transition-colors"
                        >
                          📷 Fotoğraf Çek
                        </label>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileChange}
                        className="hidden"
                        id="camera-upload"
                      />
                      <p className="text-xs text-gray-400">
                        PNG, JPEG - Maks. 10MB
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle>2. Bilgileri Gir</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    id="childAge"
                    type="number"
                    label="Çocuğun Yaşı"
                    min={5}
                    max={12}
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                  />

                  <Select
                    id="drawingType"
                    label="Çizim Türü"
                    value={drawingType}
                    onChange={(e) =>
                      setDrawingType(e.target.value as DrawingType)
                    }
                    options={[
                      { value: "house", label: "Ev" },
                      { value: "tree", label: "Ağaç" },
                      { value: "person", label: "İnsan" },
                      { value: "full_htp", label: "Tam HTP" },
                    ]}
                  />

                  <Select
                    id="language"
                    label="Rapor Dili"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    options={[
                      { value: "tr", label: "Türkçe" },
                      { value: "en", label: "English" },
                    ]}
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <input
                    type="checkbox"
                    id="anonymize"
                    checked={anonymize}
                    onChange={(e) => setAnonymize(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <label htmlFor="anonymize" className="text-sm text-blue-800 font-medium cursor-pointer">
                    Veriyi anonimleştir — KVKK kapsamında kişisel veri güvenliği için <strong>önerilir</strong>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Parental Consent & Ethics Notice */}
            <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-amber-900">
                Analiz Başlamadan Önce Onaylayın
              </p>
              <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                <li>
                  Bu çizimi yüklemeden önce çocuğun velisi/vasisi bilgilendirilmiş
                  ve KVKK kapsamında gerekli açık rıza alınmıştır.
                </li>
                <li>
                  Analiz sonuçları yalnızca mesleki gelişimsel referans amacıyla
                  kullanılacaktır; tanı veya teşhis için kullanılmayacaktır.
                </li>
                <li>
                  Sonuçlar çocuk veya ailesiyle paylaşılırken klinik denetim
                  altında değerlendirilecektir.
                </li>
              </ul>
            </div>

            {/* Submit */}
            <Button
              size="lg"
              className="w-full"
              disabled={!file}
              onClick={handleAnalyze}
            >
              Akademik Referans Analizini Başlat
            </Button>
          </div>
        )}

        {step === "analyzing" && (
          <Card>
            <CardContent className="py-16">
              <Loading size="lg" className="mb-4" />
              <p className="text-center text-gray-600 font-medium">
                Görüntü işleniyor ve akademik veri tabanı taranıyor...
              </p>
              <p className="text-center text-sm text-gray-400 mt-2">
                Gemini 2.0 Flash ile analiz ediliyor.
              </p>
            </CardContent>
          </Card>
        )}

        {step === "results" && results && (
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Genel Değerlendirme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {preview && (
                    <div className="relative group shrink-0 self-start">
                      <img
                        src={preview}
                        alt="Analyzed drawing"
                        className="w-full md:w-64 h-auto object-cover rounded-lg shadow-md border border-gray-100"
                        id="target-image"
                      />
                      {/* Bounding Box Overlay */}
                      {selectedBox && (
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 1000 1000"
                          preserveAspectRatio="none"
                        >
                          <rect
                            x={selectedBox[1]}
                            y={selectedBox[0]}
                            width={selectedBox[3] - selectedBox[1]}
                            height={selectedBox[2] - selectedBox[0]}
                            fill="rgba(79, 70, 229, 0.1)"
                            stroke="#4f46e5"
                            strokeWidth="8"
                            rx="10"
                            className="animate-pulse"
                          />
                        </svg>
                      )}
                      <div className="absolute top-2 right-2 flex flex-col gap-1 no-print">
                        <span className="text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">ORİJİNAL</span>
                        {selectedBox && (
                          <button 
                            onClick={() => setSelectedBox(null)}
                            className="text-[10px] font-bold text-white bg-red-600/80 px-1.5 py-0.5 rounded backdrop-blur-sm hover:bg-red-700 transition-colors pointer-events-auto"
                          >
                            TEMİZLE
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Özet</h4>
                      <p className="text-gray-700 leading-relaxed">{results.summary}</p>
                    </div>
                    {results.spatialAnalysis && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Mekansal Analiz</h4>
                        <p className="text-gray-700 leading-relaxed text-sm italic">{results.spatialAnalysis}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase">
                        {childAge} yaş
                      </span>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase">
                        {drawingType.replace('_', ' ')} Analizi
                      </span>
                      {savedId && (
                        <span className="text-xs font-mono text-gray-400 py-1">
                          ID: {savedId.slice(-6)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Developmental Notes */}
            {results.developmentalNotes && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <h4 className="text-sm font-bold text-indigo-900 mb-1 uppercase tracking-wider flex items-center gap-2">
                  <span>📈</span> Yaş Gelişim Notu ({childAge} Yaş)
                </h4>
                <p className="text-sm text-indigo-800 leading-relaxed">
                  {results.developmentalNotes}
                </p>
              </div>
            )}

            {/* Interpretations */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">
                  Gelişimsel Referans Bulgular ({results.interpretations.length})
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400 uppercase">HTP Literatür Referansı</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>
              {/* Safety notice above cards */}
              <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Aşağıdaki bulgular akademik HTP literatürüne dayalı <strong>gelişimsel referans bilgileridir</strong>.
                  Hiçbir bulgu tek başına tanı niteliği taşımaz; çocuğun yaşı, kültürel bağlamı ve
                  diğer gözlemlerle birlikte ancak yetkili bir uzman tarafından değerlendirilebilir.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {results.interpretations.map((interpretation, index) => (
                  <InterpretationCard
                    key={index}
                    interpretation={interpretation}
                    lang={language}
                    isActive={JSON.stringify(interpretation.boundingBox) === JSON.stringify(selectedBox)}
                    onHighlight={(box) => setSelectedBox(box)}
                  />
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {results.recommendations && results.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Öneriler</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚖️</span>
                <div className="space-y-2">
                  <h4 className="font-bold text-amber-900">Etik ve Yasal Sorumluluk Bildirimi</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Bu rapor, NIDA — <strong>Native Interpretive Drawing Analysis</strong> sistemi tarafından
                    House-Tree-Person (HTP) akademik literatürü referans alınarak üretilmiştir.
                    Sunulan bulgular <strong>gelişimsel referans bilgisidir</strong>; tanı, teşhis veya klinik
                    değerlendirme niteliği taşımaz. Bulgular yalnızca, diğer klinik gözlemler ve testlerle
                    birleştirilerek eğitimli psikolog veya psikiyatrist tarafından yorumlanabilir.
                    Sonuçların yanlış kullanımından doğabilecek zararlar münhasıran kullanıcıya aittir.
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    KVKK uyarınca: Bu analizde işlenen çocuğa ait veriler için veli onayı
                    alınmış olduğu kullanıcı tarafından beyan edilmiştir.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 no-print pb-12">
              <Button variant="outline" onClick={handleReset}>
                Yeni Analiz
              </Button>
              <Button variant="outline" onClick={() => window.print()} className="bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100">
                📄 Raporu Yazdır / PDF Kaydet
              </Button>
              <Link href="/dashboard">
                <Button>Dashboard&apos;a Dön</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
