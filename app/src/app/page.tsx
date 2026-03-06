import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white font-semibold text-sm">N</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 tracking-tight">NIDA</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Kayıt Ol
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
              Erzincan Binali Yıldırım Üniversitesi
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Native Interpretive<br />
              <span className="font-medium">Drawing Analysis</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              NIDA, House-Tree-Person (HTP) çizimlerini yapay zekâ ile analiz ederek
              okul psikolojik danışmanlarının gelişimsel değerlendirme süreçlerini
              akademik literatür referanslarıyla destekleyen bir karar destek aracıdır.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="bg-gray-900 text-white px-6 py-3 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Sisteme Başla
              </Link>
              <a
                href="/NIDA-Akademik-Rapor.pdf"
                download
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Akademik Rapor (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* Method Section */}
        <section className="border-t border-gray-100">
          <div className="container mx-auto px-6 py-16">
            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-8">
              Yöntem
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="text-3xl font-light text-gray-300 mb-4">01</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Çizim Yükleme
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  HTP çiziminin dijital görüntüsünü sisteme yükleyin.
                  Desteklenen formatlar: PNG, JPEG.
                </p>
              </div>
              <div>
                <div className="text-3xl font-light text-gray-300 mb-4">02</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Yapay Zekâ Analizi
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Gemini 2.0 modeli, çizimi akademik bilgi tabanı ile
                  eşleştirerek yorumlar.
                </p>
              </div>
              <div>
                <div className="text-3xl font-light text-gray-300 mb-4">03</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Kaynak Destekli Rapor
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Güven seviyeleri ve akademik referanslarla desteklenen
                  yorumlar sunulur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Foundation */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="container mx-auto px-6 py-16">
            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-8">
              Akademik Temel
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div>
                <p className="text-sm font-medium text-gray-900">Buck, J. N.</p>
                <p className="text-xs text-gray-500">1948 · HTP Tekniği</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Hammer, E. F.</p>
                <p className="text-xs text-gray-500">1958 · Projektif Çizimler</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Machover, K.</p>
                <p className="text-xs text-gray-500">1949 · İnsan Figürü</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Koch, C.</p>
                <p className="text-xs text-gray-500">1952 · Ağaç Testi</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Koppitz, E. M.</p>
                <p className="text-xs text-gray-500">1968 · Çocuk Çizimleri</p>
              </div>
            </div>
            <p className="mt-8 text-xs text-gray-500">
              Bilgi tabanı 85+ akademik kaynak ve 200+ yorumlama kuralı içerir.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-gray-100">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-3xl">
              <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                Önemli Bilgi
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                NIDA (Native Interpretive Drawing Analysis) bir tanı veya teşhis
                aracı değildir. Sunulan yorumlar, akademik literatüre dayalı
                gelişimsel referans bilgileridir ve profesyonel klinik
                değerlendirmenin yerini alamaz. Endişelendirici bulgularda yetkili
                uzman yönlendirmesi zorunludur. Sistem, yalnızca lisanslı psikolojik
                danışmanlar ve bu alanda eğitim almış öğretmenler tarafından
                kullanılmalıdır.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              <p>2026 NIDA · Native Interpretive Drawing Analysis · Akademik Proje</p>
              <p className="mt-1">Erzincan Binali Yıldırım Üniversitesi, Eğitim Fakültesi</p>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <a
                href="https://github.com/tialkan/nida"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors"
              >
                GitHub
              </a>
              <a
                href="/NIDA-Akademik-Rapor.pdf"
                download
                className="hover:text-gray-700 transition-colors"
              >
                Rapor İndir
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
