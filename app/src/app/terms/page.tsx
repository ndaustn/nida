import Link from "next/link";

export default function Terms() {
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
            Kullanim Sartlari
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Son guncelleme: Ocak 2025
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                1. Hizmet Tanimi
              </h2>
              <p className="text-gray-600">
                NIDA, cocuk cizimlerinin yapay zeka destekli analizini saglayan
                akademik bir projedir. Sistem, House-Tree-Person (HTP) cizimlerini
                analiz ederek okul psikolojik danismanlarinin degerlendirme
                sureclerini destekler.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                2. Onemli Uyari
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
                <p className="text-amber-800 font-medium">
                  NIDA psikolojik tani araci degildir.
                </p>
              </div>
              <p className="text-gray-600">
                Sunulan yorumlar akademik literature dayali karar destek bilgileri
                olup, profesyonel klinik degerlendirmenin yerini almaz. Endiselendirici
                bulgularda mutlaka uzman yonlendirmesi yapilmalidir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                3. Kullanici Sorumlulugu
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Sistemi yalnizca egitim ve akademik amaclarla kullanmak</li>
                <li>Yuklenen cizimlerin gizliligini korumak</li>
                <li>Analiz sonuclarini tani amacli kullanmamak</li>
                <li>Cocuklarin kimlik bilgilerini paylasmamaak</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                4. Fikri Mulkiyet
              </h2>
              <p className="text-gray-600">
                NIDA, Erzincan Binali Yildirim Universitesi Egitim Fakultesi
                bunyesinde gelistirilen akademik bir projedir. Kaynak kodu
                acik kaynak olarak GitHub uzerinde paylasılmaktadir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                5. Sorumluluk Siniri
              </h2>
              <p className="text-gray-600">
                NIDA ekibi, sistemin kullanimindan kaynaklanabilecek dogrudan
                veya dolayli zararlardan sorumlu tutulamaz. Sistem, akademik
                arastirma ve destek amacli olup, profesyonel psikolojik
                degerlendirmenin yerini almaz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                6. Degisiklikler
              </h2>
              <p className="text-gray-600">
                Bu kullanim sartlari onceden bildirim yapilmaksizin
                guncellenebilir. Guncel sartlar her zaman bu sayfada
                yayinlanacaktir.
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
