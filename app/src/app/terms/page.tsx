import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white font-semibold text-sm">N</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 tracking-tight">
                NIDA
              </span>
              <span className="hidden md:inline text-xs text-gray-400 font-normal">
                Native Interpretive Drawing Analysis
              </span>
            </Link>
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

      {/* Content */}
      <main className="container mx-auto px-6 py-16 flex-1">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Kullanım Şartları
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Son güncelleme: Şubat 2026 · NIDA — Native Interpretive Drawing
            Analysis
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                1. Hizmet Tanımı
              </h2>
              <p className="text-gray-600">
                NIDA (Native Interpretive Drawing Analysis), çocuk çizimlerinin
                yapay zeka destekli akademik analizi için geliştirilmiş bir
                karar destek aracıdır. Sistem, House-Tree-Person (HTP)
                çizimlerini analiz ederek okul psikolojik danışmanlarının ve
                öğretmenlerin gelişimsel değerlendirme süreçlerini akademik
                literatür referanslarıyla destekler.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                2. Kritik Uyarı — Tanı Değildir
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-semibold">
                  NIDA bir psikolojik tanı veya teşhis aracı DEĞİLDİR.
                </p>
              </div>
              <p className="text-gray-600 mb-3">
                Sunulan yorumlar, akademik literatüre dayalı gelişimsel referans
                bilgileridir. Bu bilgiler:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Profesyonel klinik değerlendirmenin yerini alamaz</li>
                <li>Tek başına tanı veya teşhis koyma amacıyla kullanılamaz</li>
                <li>Çocuğu veya aileyi etiketlemek için kullanılamaz</li>
                <li>Hukuki süreçlerde delil niteliği taşımaz</li>
              </ul>
              <p className="mt-3 text-gray-600">
                Endişelendirici bulgularda mutlaka yetkili psikolog veya
                psikiyatrist yönlendirmesi yapılmalıdır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                3. Kullanıcı Yetki ve Sorumlulukları
              </h2>
              <p className="text-gray-600 mb-3">
                Sistemi kullanmaya devam ederek aşağıdaki koşulları kabul etmiş
                olursunuz:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  Sistemi yalnızca eğitim, danışmanlık ve akademik amaçlarla kullanmak
                </li>
                <li>
                  Yüklenen çizimlerin ait olduğu çocukların velilerinden KVKK
                  kapsamında gerekli açık rızayı almış olmak
                </li>
                <li>
                  Analiz sonuçlarını tanı veya teşhis amacıyla kullanmamak
                </li>
                <li>
                  Çocukların kimlik bilgilerini sistem üzerinden paylaşmamak
                </li>
                <li>
                  Analiz sonuçlarını yalnızca mesleki bağlamda ve gizlilik
                  ilkelerine uygun şekilde değerlendirmek
                </li>
                <li>
                  Sistemi kötüye kullanmamak, reverse engineering yapmamak
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                4. Veli Onayı Zorunluluğu
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  <strong>KVKK Kapsamında Önemli Sorumluluk:</strong> Sisteme
                  yüklediğiniz her çizim, küçük bir bireye aittir. 6698 Sayılı
                  KVKK uyarınca küçüklere ait kişisel verilerin işlenmesi için
                  veli/vasi açık rızası zorunludur. Bu yükümlülüğün yerine
                  getirilmesinden münhasıran kullanıcı sorumludur. NIDA ekibi
                  bu konuda hiçbir sorumluluk kabul etmez.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                5. Fikri Mülkiyet
              </h2>
              <p className="text-gray-600">
                NIDA, Erzincan Binali Yıldırım Üniversitesi Eğitim Fakültesi
                bünyesinde geliştirilen akademik bir projedir. Kaynak kodu
                açık kaynak olarak GitHub üzerinden paylaşılmaktadır.
                Akademik içerikler ilgili kaynakların telifleri kapsamındadır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                6. Sorumluluk Sınırı
              </h2>
              <p className="text-gray-600">
                NIDA ekibi ve Erzincan Binali Yıldırım Üniversitesi, sistemin
                kullanımından kaynaklanabilecek doğrudan veya dolaylı zararlardan
                sorumlu tutulamaz. Sistem akademik referans amacıyla tasarlanmış
                olup profesyonel psikolojik değerlendirmenin yerine geçemez.
                Yanlış kullanımdan doğabilecek hukuki sonuçlar münhasıran
                kullanıcıya aittir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                7. Hesap Askıya Alma
              </h2>
              <p className="text-gray-600">
                Bu kullanım şartlarının ihlali, hesabın askıya alınması veya
                kalıcı olarak kapatılmasına yol açabilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                8. Değişiklikler
              </h2>
              <p className="text-gray-600">
                Bu kullanım şartları önceden bildirim yapılarak güncellenebilir.
                Güncel şartlar her zaman bu sayfada yayınlanacaktır.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              <p>2026 NIDA — Native Interpretive Drawing Analysis</p>
              <p className="mt-1">Erzincan Binali Yıldırım Üniversitesi</p>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link
                href="/privacy"
                className="hover:text-gray-700 transition-colors"
              >
                Gizlilik
              </Link>
              <Link
                href="/terms"
                className="hover:text-gray-700 transition-colors"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
