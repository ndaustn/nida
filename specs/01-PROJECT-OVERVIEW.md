# NIDA - Project Overview

> **Neural Imagery Diagnostic Assessment**
> Çocuk Çizimlerinden Psikolojik Analiz Platformu

---

## 1. Proje Özeti

**NIDA**, 5-12 yaş arası çocukların House-Tree-Person (HTP) çizimlerini analiz ederek psikolojik değerlendirme sunan web tabanlı bir akademik projedir.

### Temel Özellikler

| Özellik | Açıklama |
|---------|----------|
| **Hedef Kullanıcı** | Okul danışmanları, öğretmenler |
| **Yaş Aralığı** | 5-12 yaş |
| **Çizim Türü** | HTP (House-Tree-Person / Ev-Ağaç-İnsan) |
| **AI Modeli** | Gemini 2.0 Flash (Multimodal LLM) |
| **Yaklaşım** | Akademik literatüre dayalı Knowledge Base + LLM yorumlama |
| **Çıktı Dili** | Türkçe / İngilizce (ayarlanabilir) |

---

## 2. Problem Tanımı

### Mevcut Durum
- Çocuk çizimi analizi uzman gerektiren, zaman alıcı bir süreç
- Okul danışmanları genellikle bu konuda yeterli eğitime sahip değil
- Erken dönem psikolojik sorunların tespiti gecikiyor

### Çözüm
NIDA, akademik literatüre dayalı bir bilgi tabanı kullanarak HTP çizimlerini analiz eder ve okul danışmanlarına yapılandırılmış, kaynak destekli yorumlar sunar.

---

## 3. Kapsam

### Dahil Olanlar (In Scope)
- [x] HTP çizimi yükleme ve analiz
- [x] Akademik kaynaklara dayalı yorum üretme
- [x] Çelişkili yorumları şeffaf sunma
- [x] Türkçe/İngilizce çıktı desteği
- [x] Kullanıcı yönetimi (okul danışmanları)
- [x] Analiz geçmişi ve raporlama

### Dahil Olmayanlar (Out of Scope)
- [ ] Kesin tanı koyma (sadece destekleyici araç)
- [ ] Tedavi önerisi sunma
- [ ] Çocuklarla doğrudan etkileşim
- [ ] Veli/aile erişimi (v1.0'da)

---

## 4. Hedefler ve Başarı Kriterleri

### Akademik Hedefler
| Hedef | Metrik |
|-------|--------|
| Literatür kapsama | Min. 50 akademik kaynak KB'de |
| Yorum tutarlılığı | Aynı çizim için %90+ tutarlı sonuç |
| Kaynak atıf oranı | Her yorum için min. 1 kaynak |

### Teknik Hedefler
| Hedef | Metrik |
|-------|--------|
| Analiz süresi | < 10 saniye |
| Uptime | %99.5 |
| Concurrent users | 100+ |

---

## 5. Stakeholders

| Rol | Sorumluluk |
|-----|------------|
| **Proje Sahibi** | Vizyon, kapsam, akademik yön |
| **Geliştirici** | Teknik implementasyon |
| **Akademik Danışman** | KB doğrulama, akademik geçerlilik |
| **Pilot Kullanıcılar** | Okul danışmanları (test aşaması) |

---

## 6. Kısıtlamalar ve Riskler

### Kısıtlamalar
- Veri seti yok - tamamen literatür tabanlı
- Tek kişilik geliştirme ekibi
- Akademik proje bütçesi

### Riskler

| Risk | Olasılık | Etki | Mitigasyon |
|------|----------|------|------------|
| LLM halüsinasyonu | Orta | Yüksek | KB ile sınırlandırma, kaynak zorunluluğu |
| Yanlış kullanım (tanı gibi) | Orta | Yüksek | Disclaimer, eğitim materyali |
| Etik endişeler | Düşük | Yüksek | Etik framework, IRB onayı |
| API maliyet aşımı | Düşük | Orta | Rate limiting, önbellek |

---

## 7. Zaman Çizelgesi (Faz Bazlı)

### Faz 1: Temel Altyapı
- [ ] Knowledge Base şeması ve ilk veriler
- [ ] Temel web arayüzü
- [ ] Gemini API entegrasyonu
- [ ] Auth sistemi

### Faz 2: Core Özellikler
- [ ] HTP analiz motoru
- [ ] Çoklu dil desteği
- [ ] Raporlama sistemi

### Faz 3: İyileştirme
- [ ] Pilot test (okul danışmanları)
- [ ] Feedback toplama ve iterasyon
- [ ] Akademik makale yazımı

---

## 8. Teknoloji Stack

```
Frontend:     Next.js 14 + Tailwind CSS + TypeScript
Backend:      Next.js API Routes + Vercel AI SDK
Database:     Firebase Firestore
Auth:         Firebase Auth
Storage:      Firebase Storage
LLM:          Gemini 2.0 Flash API
Deployment:   Vercel
```

---

## 9. Referanslar

Bu proje aşağıdaki akademik temellere dayanmaktadır:

- Buck, J. N. (1948). The H-T-P Technique: A Qualitative and Quantitative Scoring Manual
- Hammer, E. F. (1958). The Clinical Application of Projective Drawings
- Lowenfeld, V. (1947). Creative and Mental Growth

Detaylı kaynak listesi: [08-ACADEMIC-REFERENCES.md](./08-ACADEMIC-REFERENCES.md)

---

*Son Güncelleme: 2025-01-23*
*Versiyon: 1.0.0*
