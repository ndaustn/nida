import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white font-semibold text-sm">N</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 tracking-tight">NIDA</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Giris Yap
              </Link>
              <Link
                href="/register"
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Kayit Ol
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-medium text-gray-900 mb-8">
            Gizlilik Politikasi
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Son guncelleme: Ocak 2025
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                1. Toplanan Veriler
              </h2>
              <p className="text-gray-600 mb-4">
                NIDA, hizmet sunumu icin asagidaki verileri toplar:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Hesap bilgileri (e-posta adresi)</li>
                <li>Yuklenen cocuk cizimleri</li>
                <li>Analiz sonuclari ve raporlar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                2. Verilerin Kullanimi
              </h2>
              <p className="text-gray-600 mb-4">
                Toplanan veriler yalnizca asagidaki amaclarla kullanilir:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Cizim analiz hizmetinin sunulmasi</li>
                <li>Kullanici hesabinin yonetimi</li>
                <li>Hizmet kalitesinin iyilestirilmesi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                3. Veri Guvenligi
              </h2>
              <p className="text-gray-600">
                Verileriniz Firebase altyapisi uzerinde guvenli bir sekilde saklanmaktadir.
                Yuklenen cizimler ve analiz sonuclari yalnizca hesap sahibi tarafindan
                erisilebilir durumdadir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                4. Ucuncu Taraf Hizmetler
              </h2>
              <p className="text-gray-600">
                NIDA, cizim analizi icin Google Gemini API hizmetini kullanmaktadir.
                Yuklenen gorseller analiz amacli olarak bu hizmete iletilmektedir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                5. Iletisim
              </h2>
              <p className="text-gray-600">
                Gizlilik politikasi ile ilgili sorulariniz icin GitHub uzerinden
                iletisime gecebilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              <p>2025 NIDA - Erzincan Binali Yildirim Universitesi</p>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">
                Gizlilik
              </Link>
              <Link href="/terms" className="hover:text-gray-700 transition-colors">
                Kullanim Sartlari
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
