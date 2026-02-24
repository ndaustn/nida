# NIDA - Ethical Framework

> Etik İlkeler ve Sorumluluk Çerçevesi

---

## 1. Giriş

NIDA, çocuk psikolojisi ile ilgili hassas bir alanda faaliyet göstermektedir. Bu döküman, projenin etik temellerini, sınırlarını ve sorumluluk alanlarını tanımlar.

### Temel Etik Prensipler

| Prensip | Açıklama |
|---------|----------|
| **Primum non nocere** | "Önce zarar verme" - Her kararın potansiyel zararı değerlendirilmeli |
| **Şeffaflık** | Sistemin sınırları açıkça belirtilmeli |
| **Mahremiyet** | Çocuk verileri en üst düzeyde korunmalı |
| **Akademik Dürüstlük** | Tüm yorumlar kaynağa dayandırılmalı |
| **Kullanıcı Özerkliği** | Son karar her zaman profesyonelde |

---

## 2. Sistemin Sınırları

### 2.1 NIDA Ne DEĞİLDİR

```
┌─────────────────────────────────────────────────────────────┐
│  ❌ NIDA şunları YAPMAZ:                                    │
│                                                              │
│  • Psikolojik tanı koymaz                                   │
│  • Tedavi önerisi sunmaz                                    │
│  • Kesin yargılarda bulunmaz                                │
│  • Çocuk hakkında kişisel değerlendirme yapmaz              │
│  • Profesyonel değerlendirmenin yerini almaz                │
│  • Risk değerlendirmesi yapmaz (intihar, istismar vb.)      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 NIDA Ne YAPAR

```
┌─────────────────────────────────────────────────────────────┐
│  ✅ NIDA şunları YAPAR:                                     │
│                                                              │
│  • Akademik literatüre dayalı yorumlar sunar                │
│  • Kaynakları şeffaf şekilde gösterir                       │
│  • Güven seviyelerini belirtir                              │
│  • Çelişkili görüşleri aktarır                              │
│  • Profesyonel değerlendirme önerir                         │
│  • Eğitici içerik sağlar                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Zorunlu Uyarılar (Disclaimers)

### 3.1 Ana Disclaimer

Tüm analiz sonuçlarında görünmesi ZORUNLU:

```
⚠️ ÖNEMLİ UYARI

Bu analiz bir tanı aracı değildir. Sunulan yorumlar akademik
literatüre dayalı olup, kesin psikolojik değerlendirme yerine
geçmez.

• Tek bir çizim göstergesi kesin bir anlam taşımaz
• Yorumlar çocuğun yaşı, kültürü ve bağlamı ile birlikte
  değerlendirilmelidir
• Endişe durumunda mutlaka bir ruh sağlığı uzmanına başvurun
• Bu araç profesyonel değerlendirmenin yerini almaz

Bu aracı kullanarak bu koşulları kabul etmiş sayılırsınız.
```

### 3.2 Travma/İstismar Uyarısı

Belirli göstergeler tespit edildiğinde ek uyarı:

```
🚨 DİKKAT

Bu analizde bazı göstergeler tespit edilmiştir. Bu göstergeler
akademik literatürde travma veya istismar ile ilişkilendirilmiş
olsa da, kesinlikle tanı koymaz.

ÖNERİ: Bir çocuk psikoloğu veya psikiyatristi ile görüşmenizi
önemle tavsiye ederiz.

Acil durumlarda: ALO 183 (Çocuk Hattı)
```

### 3.3 Kayıt Sırasında Onay

```
☐ NIDA'nın bir tanı aracı olmadığını anlıyorum
☐ Sonuçların profesyonel değerlendirme gerektirdiğini kabul ediyorum
☐ Çocuk verilerinin gizliliğine dikkat edeceğimi taahhüt ediyorum
☐ Bu aracı yalnızca eğitim/değerlendirme desteği amaçlı kullanacağım
```

---

## 4. Veri Gizliliği ve Güvenlik

### 4.1 Çocuk Verilerinin Korunması

| Önlem | Uygulama |
|-------|----------|
| **Anonim Analiz** | Çizimler çocuk kimliği olmadan saklanabilir |
| **Veri Minimizasyonu** | Yalnızca gerekli veriler toplanır |
| **Şifreleme** | Tüm veriler transit ve rest'te şifrelenir |
| **Erişim Kontrolü** | Yalnızca yetkili kullanıcılar erişir |
| **Saklama Süresi** | Kullanıcı istediğinde silme hakkı |
| **Coğrafi Konum** | Veriler Türkiye/AB'de saklanır |

### 4.2 KVKK/GDPR Uyumu

```typescript
interface ChildDataPolicy {
  // Veri toplama
  collectMinimumData: true;
  noDirectChildIdentifiers: true;  // İsim, TC No vb. toplanmaz

  // Rıza
  parentalConsentRequired: false;  // Çizim yükleyen profesyoneldir
  professionalConsentRequired: true;

  // Saklama
  dataRetentionPeriod: '12 months';
  userCanDeleteAnytime: true;

  // Erişim
  encryptionAtRest: true;
  encryptionInTransit: true;
  accessLogging: true;
}
```

### 4.3 Veri Kullanım Politikası

| Kullanım | İzin |
|----------|------|
| Analiz için Gemini API'ye gönderme | ✅ Evet (şifreli) |
| Model eğitimi için kullanma | ❌ Hayır |
| Üçüncü taraflarla paylaşma | ❌ Hayır |
| Anonim istatistik | ✅ Evet (opt-in) |
| Akademik araştırma | ✅ Evet (anonimleştirilmiş, onaylı) |

---

## 5. Yanlış Kullanım Önleme

### 5.1 Potansiyel Yanlış Kullanımlar

| Risk | Önlem |
|------|-------|
| **Tanı gibi kullanma** | Sürekli disclaimer, eğitim içeriği |
| **Çocuğu etiketleme** | "Olası", "gösterebilir" dili kullanımı |
| **Ailelerle paylaşma** | Rapor formatında uyarılar, profesyonel dil |
| **Hukuki delil olarak kullanma** | Açık sorumluluk reddi |
| **Yetkisiz kişilerin kullanımı** | Profesyonel doğrulama gereksinimi |

### 5.2 Kullanıcı Eğitimi

Her yeni kullanıcı için zorunlu:

1. **Onboarding Eğitimi**
   - HTP testinin sınırları
   - Yorumların doğası
   - Etik kullanım kuralları

2. **Bağlamsal Yardım**
   - Her yorumda "Bu ne anlama gelir?" açıklaması
   - "Ne zaman endişelenmeli?" rehberi

3. **Kaynak Erişimi**
   - Akademik kaynakların detayları
   - Profesyonel yönlendirme rehberi

---

## 6. Akademik Dürüstlük

### 6.1 Kaynak Zorunluluğu

```
Her yorum için ZORUNLU:
├── En az 1 akademik kaynak
├── Güven seviyesi belirtimi
├── Çelişen görüşlerin sunumu
└── Metodolojik sınırlamaların belirtimi
```

### 6.2 Halüsinasyon Önleme

```typescript
// LLM Çıktı Doğrulama
interface OutputValidation {
  // Her yorum KB'de olmalı
  interpretationInKnowledgeBase: required;

  // Kaynak doğrulama
  sourceVerification: required;

  // Uydurma tespit
  hallucination: {
    detectUnsupportedClaims: true;
    rejectIfNoSource: true;
    flagLowConfidence: true;
  };
}
```

### 6.3 Belirsizlik İfadesi

Kullanılması GEREKEN dil:

| ❌ Kullanılmamalı | ✅ Kullanılmalı |
|-------------------|-----------------|
| "Bu çocuk anksiyeteli" | "Anksiyete ile ilişkilendirilebilir" |
| "Travma yaşamış" | "Travma göstergesi olabilir" |
| "Kesinlikle sorunlu" | "Profesyonel değerlendirme önerilir" |
| "Normal değil" | "Yaş grubuna göre değerlendirilmeli" |

---

## 7. Kriz Yönetimi

### 7.1 Ciddi Gösterge Protokolü

Belirli göstergeler tespit edildiğinde:

```
Tetikleyici Göstergeler:
├── Cinsel organ vurgusu
├── Şiddet sembolleri
├── Aşırı karanlık/korku teması
├── Kendine zarar göstergeleri
└── Aile içi şiddet işaretleri

↓

Protokol:
1. Özel uyarı mesajı göster
2. Profesyonel destek kaynaklarını sun
3. Acil yardım hatlarını belirt
4. Sonuçları detaylandırmadan genel ifade kullan
5. Log kaydı tut (anonim istatistik için)
```

### 7.2 Acil Destek Kaynakları

```
🆘 ACİL DESTEK HATLARI

Türkiye:
• ALO 183 - Çocuk Hattı
• ALO 182 - Sosyal Destek Hattı
• ALO 112 - Acil Yardım

Uluslararası:
• UNICEF Çocuk Hakları
• WHO Mental Health Resources
```

---

## 8. Yasal Sorumluluk

### 8.1 Sorumluluk Reddi

```
YASAL SORUMLULUK REDDİ

NIDA ("Yazılım"), yalnızca eğitim ve değerlendirme desteği
amacıyla sunulmaktadır.

1. Yazılım, tıbbi veya psikolojik tanı aracı değildir.

2. Yazılımın ürettiği sonuçlar, profesyonel değerlendirmenin
   yerini almaz ve almamalıdır.

3. Geliştiriciler, Yazılım çıktılarına dayalı alınan
   kararlardan sorumlu değildir.

4. Kullanıcı, Yazılımı yalnızca yetkili olduğu profesyonel
   kapsamda kullanmayı kabul eder.

5. Çocuklarla ilgili herhangi bir karar, mutlaka nitelikli
   bir ruh sağlığı uzmanı tarafından verilmelidir.

Bu koşulları kabul etmeden Yazılım kullanılamaz.
```

### 8.2 Kullanıcı Sorumlulukları

```
KULLANICI BEYANI

Kullanıcı olarak:

☐ Bir eğitim kurumunda danışman/öğretmen olduğumu beyan ederim
☐ Sonuçları tanı olarak kullanmayacağımı taahhüt ederim
☐ Çocuk verilerini koruyacağımı taahhüt ederim
☐ Ailelere sonuçları uygun şekilde ileteceğimi kabul ederim
☐ Endişe durumunda profesyonele yönlendireceğimi kabul ederim
```

---

## 9. Etik İnceleme

### 9.1 Akademik Etik Onayı

Akademik yayın için:

```
Gerekli Onaylar:
├── IRB (Institutional Review Board) onayı
├── Etik kurul izni
├── Aydınlatılmış onam formları
└── Veri koruma değerlendirmesi
```

### 9.2 Sürekli İyileştirme

| Aktivite | Sıklık |
|----------|--------|
| Etik gözden geçirme | 6 ayda bir |
| Kullanıcı geri bildirimi | Sürekli |
| Yanlış kullanım analizi | Aylık |
| Disclaimer güncellemesi | Gerektiğinde |
| Akademik danışman görüşü | Yıllık |

---

## 10. İletişim ve Şikayet

### 10.1 Etik Endişe Bildirimi

```
Etik endişelerinizi bildirmek için:

📧 ethics@nida-project.com
📞 [Telefon numarası]

Şikayetleriniz 48 saat içinde değerlendirilecektir.
```

### 10.2 Veri Silme Talebi

```
Verilerinizin silinmesini talep etmek için:

1. Settings > Privacy > Delete My Data
2. Veya: privacy@nida-project.com

Talebiniz 30 gün içinde işleme alınacaktır.
```

---

## 11. Versiyon ve Güncellemeler

| Versiyon | Tarih | Değişiklik |
|----------|-------|------------|
| 1.0.0 | 2025-01-23 | İlk versiyon |

---

*Bu etik çerçeve, projenin tüm paydaşları için bağlayıcıdır.*

*Son Güncelleme: 2025-01-23*
*Versiyon: 1.0.0*
