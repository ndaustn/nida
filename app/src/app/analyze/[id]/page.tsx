"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FullPageLoading } from "@/components/ui/Loading";
import { InterpretationCard } from "@/components/analysis/InterpretationCard";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Analysis } from "@/types";

export default function AnalysisDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading } = useAuth();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);
  const [error, setError] = useState("");
  const [selectedBox, setSelectedBox] = useState<[number, number, number, number] | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchAnalysis() {
      if (!user || !db || !params?.id) {
        setLoadingAnalysis(false);
        return;
      }
      try {
        const docRef = doc(db, "analyses", params.id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAnalysis({ id: docSnap.id, ...docSnap.data() } as Analysis);
        } else {
          setError("Analiz bulunamadı.");
        }
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError("Analiz yüklenirken bir hata oluştu.");
      } finally {
        setLoadingAnalysis(false);
      }
    }
    if (user) fetchAnalysis();
  }, [user, params?.id]);

  const drawingTypeLabels: Record<string, string> = {
    house: "Ev",
    tree: "Ağaç",
    person: "İnsan",
    full_htp: "Tam HTP",
  };

  if (loading || loadingAnalysis) return <FullPageLoading text="Yükleniyor..." />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-lg font-bold text-gray-900">NIDA</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">← Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <Link href="/dashboard">
              <Button>Dashboard&apos;a Dön</Button>
            </Link>
          </div>
        ) : !analysis ? null : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Analiz Detayı</h1>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Genel Değerlendirme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {analysis.imageUrl && (
                    <div className="relative shrink-0 self-start">
                      <img
                        src={analysis.imageUrl}
                        alt="Çizim"
                        className="w-full md:w-64 h-auto object-cover rounded-lg shadow-md border border-gray-100"
                      />
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
                    </div>
                  )}
                  <div className="space-y-4">
                    {analysis.summary && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Özet</h4>
                        <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase">
                        {analysis.childAge} yaş
                      </span>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase">
                        {drawingTypeLabels[analysis.drawingType] || analysis.drawingType} Analizi
                      </span>
                      <span className="text-xs font-mono text-gray-400 py-1">
                        ID: {analysis.id.slice(-6)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {analysis.createdAt
                        ? typeof (analysis.createdAt as { toDate?: () => Date }).toDate === "function"
                          ? (analysis.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR")
                          : (analysis.createdAt as Date).toLocaleDateString("tr-TR")
                        : ""}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interpretations */}
            {analysis.interpretations && analysis.interpretations.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    Akademik Bulgular ({analysis.interpretations.length})
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400 uppercase">HTP Literatür Analizi</span>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.interpretations.map((interp, i) => (
                    <InterpretationCard
                      key={i}
                      interpretation={interp}
                      lang={analysis.language || "tr"}
                      isActive={JSON.stringify(interp.boundingBox) === JSON.stringify(selectedBox)}
                      onHighlight={(box) => setSelectedBox(box)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Öneriler</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
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
                  <h4 className="font-bold text-amber-900">Etik ve Yasal Sorumluluk Reddi</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Bu analiz, House-Tree-Person (HTP) projektif test literatürüne dayalı bir{" "}
                    <strong>yapay zeka asistanı</strong> tarafından üretilmiştir. Bu sonuçlar bir{" "}
                    <strong>tanı veya teşhis niteliği taşımaz</strong>. Analiz bulguları sadece
                    eğitimli bir psikolog veya psikiyatrist tarafından, diğer klinik gözlemler ve
                    testlerle birleştirilerek değerlendirilmelidir.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 no-print pb-12">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
              >
                📄 Raporu Yazdır / PDF Kaydet
              </Button>
              <Link href="/analyze">
                <Button variant="outline">Yeni Analiz</Button>
              </Link>
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
