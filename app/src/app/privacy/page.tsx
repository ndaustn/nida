import Link from "next/link";

export default function Privacy() {
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
            Gizlilik Politikası
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Son güncelleme: Şubat 2026 · NIDA — Native Interpretive Drawing
            Analysis
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            {/* KVKK uyarısı */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm font-medium">
                6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
                kapsamında hazırlanmıştır. Bu platform üzerinden işlenen
                çocuklara ait veriler için veli/vasi açık rızası
                sorumluluğu kullanıcıya aittir.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                1. Veri Sorumlusu
              </h2>
              <p className="text-gray-600">
                NIDA — Native Interpretive Drawing Analysis, Erzincan Binali
                Yıldırım Üniversitesi Eğitim Fakültesi bünyesinde
                gerçekleştirilen akademik bir projedir. Veri sorumlusu
                sıfatıyla proje ekibi hareket etmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                2. İşlenen Kişisel Veriler
              </h2>
              <p className="text-gray-600 mb-3">
                Sistem aşağıdaki veri kategorilerini işler:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  <strong>Kullanıcı hesap bilgileri:</strong> E-posta adresi,
                  ad-soyad, kurum adı, meslek rolü
                </li>
                <li>
                  <strong>Yüklenen çizimler:</strong> Çocuğa ait el çizimi
                  görüntüleri (dijital format)
                </li>
                <li>
                  <strong>Analiz verileri:</strong> Çizim analiz sonuçları,
                  yorumlar, raporlar
                </li>
                <li>
                  <strong>Teknik veriler:</strong> IP adresi, tarayıcı bilgisi,
                  işlem zaman damgaları
                </li>
              </ul>
              <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded text-sm text-amber-800">
                <strong>Küçüklere ait veriler (KVKK Madde 6):</strong> Sisteme
                yüklenen çizimler küçüklere aittir. Bu verilerin işlenmesi
                için kullanıcı (danışman/öğretmen), ilgili çocuğun
                velisi/vasisinden gerekli açık rızayı almış olduğunu kabul
                etmektedir.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                3. Veri İşleme Amaçları ve Hukuki Dayanaklar
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-600 border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 font-medium text-gray-900">
                        Amaç
                      </th>
                      <th className="text-left py-2 font-medium text-gray-900">
                        Hukuki Dayanak
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 pr-4">Çizim analiz hizmetinin sunulması</td>
                      <td className="py-2">Sözleşmenin ifası (KVKK m.5/2-c)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Kullanıcı hesabı yönetimi</td>
                      <td className="py-2">Sözleşmenin ifası (KVKK m.5/2-c)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Hizmet güvenliği ve kötüye kullanım önleme</td>
                      <td className="py-2">Meşru menfaat (KVKK m.5/2-f)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Akademik araştırma ve sistem geliştirme</td>
                      <td className="py-2">Açık rıza (KVKK m.5/1) — anonim veriler</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                4. Üçüncü Taraf Hizmet Sağlayıcılar
              </h2>
              <p className="text-gray-600 mb-3">
                NIDA aşağıdaki üçüncü taraf hizmetlerini kullanmaktadır:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  <strong>Google Firebase:</strong> Kimlik doğrulama, veritabanı
                  ve dosya depolama (Google LLC, ABD — SCCs ile korunan aktarım)
                </li>
                <li>
                  <strong>Google Gemini API:</strong> Görüntü analizi için.
                  Yüklenen çizim görselleri analiz amacıyla bu servise iletilir.
                  Google&apos;ın veri işleme koşulları geçerlidir.
                </li>
              </ul>
              <p className="mt-3 text-sm text-gray-500">
                Veriler ticari amaçla üçüncü taraflarla paylaşılmaz veya satılmaz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                5. Veri Saklama Süresi
              </h2>
              <p className="text-gray-600">
                Analiz verileri ve yüklenen çizimler, kullanıcı hesabı aktif
                olduğu sürece saklanır. Hesap silme talebinde tüm kişisel
                veriler 30 gün içinde kalıcı olarak silinir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                6. İlgili Kişi Hakları (KVKK Madde 11)
              </h2>
              <p className="text-gray-600 mb-3">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Verilerin düzeltilmesini veya silinmesini talep etme</li>
                <li>İşlemenin kısıtlanmasını talep etme</li>
                <li>Zarara uğramanız hâlinde tazminat talep etme</li>
              </ul>
              <p className="mt-3 text-gray-600">
                Bu haklarınızı kullanmak için GitHub üzerinden veya proje iletişim
                kanalları aracılığıyla başvuru yapabilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                7. Veri Silme Talebi
              </h2>
              <p className="text-gray-600">
                Hesabınızı ve tüm ilişkili verileri silmek için dashboard
                üzerinden çıkış yaptıktan sonra proje ekibiyle iletişime geçin.
                Silme işlemleri 30 gün içinde tamamlanır ve tarafınıza bildirilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                8. Güvenlik Önlemleri
              </h2>
              <p className="text-gray-600">
                Verileriniz Firebase altyapısı üzerinde şifrelenmiş olarak
                saklanmaktadır. API erişimi Firebase kimlik doğrulaması ile
                korunmaktadır. Güvenlik açığı tespit ederseniz lütfen proje
                ekibiyle derhal iletişime geçin.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                9. Politika Güncellemeleri
              </h2>
              <p className="text-gray-600">
                Bu politika önceden bildirim yapılarak güncellenebilir.
                Önemli değişiklikler kayıtlı kullanıcılara e-posta ile
                duyurulacaktır.
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
