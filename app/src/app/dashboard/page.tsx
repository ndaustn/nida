"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FullPageLoading } from "@/components/ui/Loading";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { Analysis } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, loading, signOut, isConfigured } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchAnalyses() {
      if (!user || !db) {
        setLoadingAnalyses(false);
        return;
      }

      try {
        const q = query(
          collection(db, "analyses"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Analysis[];
        setAnalyses(data);
      } catch (error) {
        console.error("Error fetching analyses:", error);
      } finally {
        setLoadingAnalyses(false);
      }
    }

    if (user && isConfigured) {
      fetchAnalyses();
    } else {
      setLoadingAnalyses(false);
    }
  }, [user, isConfigured]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return <FullPageLoading text="Yükleniyor..." />;
  }

  if (!user) {
    return null;
  }

  const roleLabels = {
    counselor: "Psikolojik Danışman",
    teacher: "Öğretmen",
    admin: "Yönetici",
  };

  const drawingTypeLabels = {
    house: "Ev",
    tree: "Ağaç",
    person: "İnsan",
    full_htp: "Tam HTP",
  };

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
              <span className="text-lg font-bold text-gray-900">NIDA</span>
              <span className="hidden md:inline text-xs text-gray-400 font-normal ml-1">Native Interpretive Drawing Analysis</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.displayName || user.email}
                </p>
                <p className="text-xs text-gray-500">
                  {profile?.role && roleLabels[profile.role]}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hoş geldiniz, {profile?.displayName?.split(" ")[0] || "Kullanıcı"}
          </h1>
          <p className="text-gray-600">
            Çocuk çizimlerini analiz edin ve akademik temelli yorumlar alın.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/analyze">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📤</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Yeni Analiz
                </h3>
                <p className="text-sm text-gray-600">
                  HTP çizimi yükleyerek yeni bir analiz başlatın.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="h-full">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Toplam Analiz
              </h3>
              <p className="text-3xl font-bold text-indigo-600">
                {analyses.length}
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Bilgi Bankası
              </h3>
              <p className="text-sm text-gray-600">
                100+ akademik kural, 5+ kaynak.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analyses */}
        <Card>
          <CardHeader>
            <CardTitle>Son Analizler</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingAnalyses ? (
              <div className="text-center py-8 text-gray-500">
                Yükleniyor...
              </div>
            ) : analyses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Henüz analiz yapılmamış.</p>
                <Link href="/analyze">
                  <Button>İlk Analizi Başlat</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {analyses.map((analysis) => (
                  <Link
                    key={analysis.id}
                    href={`/analyze/${analysis.id}`}
                    className="block py-4 hover:bg-gray-50 -mx-4 px-4 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {analysis.imageUrl ? (
                          <img
                            src={analysis.imageUrl}
                            alt="Çizim"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🖼️
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">
                          {analysis.childAge} yaş -{" "}
                          {drawingTypeLabels[analysis.drawingType] ||
                            analysis.drawingType}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {analysis.interpretations?.length || 0} yorum
                        </p>
                        <p className="text-xs text-gray-400">
                          {analysis.createdAt
                            ? typeof (analysis.createdAt as { toDate?: () => Date }).toDate === 'function'
                              ? (analysis.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR")
                              : (analysis.createdAt as Date).toLocaleDateString("tr-TR")
                            : ""}
                        </p>
                      </div>
                      <div className="text-gray-400">→</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-sm text-amber-800">
              <strong>Hatırlatma:</strong> NIDA (Native Interpretive Drawing Analysis) bir tanı veya teşhis aracı değildir. Sunulan yorumlar akademik literatüre dayalı gelişimsel referans bilgileridir; profesyonel klinik değerlendirmenin yerini alamaz.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
