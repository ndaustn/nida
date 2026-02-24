# NIDA - UI/UX Requirements

> Kullanıcı Arayüzü ve Deneyim Gereksinimleri

---

## 1. Tasarım Prensipleri

### 1.1 Temel İlkeler

| İlke | Açıklama |
|------|----------|
| **Güven Verici** | Profesyonel, akademik ton; güvenilirlik hissi |
| **Sade** | Karmaşık psikolojik bilgiyi basit sunma |
| **Erişilebilir** | WCAG 2.1 AA uyumlu |
| **Hızlı** | Minimum yükleme, anında feedback |
| **Eğitici** | Kullanıcıyı yönlendiren, öğretici |

### 1.2 Renk Paleti

```css
/* Primary */
--primary-50: #EEF2FF;
--primary-100: #E0E7FF;
--primary-500: #6366F1;   /* Ana renk - Indigo */
--primary-600: #4F46E5;
--primary-700: #4338CA;

/* Secondary */
--secondary-500: #06B6D4; /* Cyan - Vurgu */

/* Semantic */
--success: #10B981;       /* Yeşil */
--warning: #F59E0B;       /* Turuncu */
--error: #EF4444;         /* Kırmızı */
--info: #3B82F6;          /* Mavi */

/* Neutral */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-500: #6B7280;
--gray-900: #111827;

/* Confidence Levels */
--confidence-low: #FCD34D;
--confidence-moderate: #60A5FA;
--confidence-high: #34D399;
```

### 1.3 Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

---

## 2. Sayfa Yapısı

### 2.1 Site Haritası

```
NIDA
├── Landing Page (/)
├── Auth
│   ├── Login (/login)
│   └── Register (/register)
├── Dashboard (/dashboard)
│   ├── Overview
│   ├── Quick Analyze
│   └── Recent Analyses
├── Analyze (/analyze)
│   ├── Upload
│   ├── Processing
│   └── Result
├── History (/history)
│   ├── List View
│   └── Detail View
├── Reports (/reports)
│   ├── List
│   ├── Create
│   └── View/Download
├── Knowledge Base (/kb)
│   ├── Browse
│   └── Search
├── Settings (/settings)
│   ├── Profile
│   ├── Preferences
│   └── Language
└── Help (/help)
    ├── Guide
    └── FAQ
```

### 2.2 Layout Yapısı

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
│  ┌─────────┐  ┌─────────────────────┐  ┌──────┐  ┌───────┐ │
│  │  Logo   │  │     Navigation      │  │ Lang │  │ User  │ │
│  └─────────┘  └─────────────────────┘  └──────┘  └───────┘ │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SIDEBAR          MAIN CONTENT                              │
│  ┌─────────┐     ┌────────────────────────────────────────┐ │
│  │         │     │                                        │ │
│  │  Menu   │     │                                        │ │
│  │         │     │                                        │ │
│  │         │     │                                        │ │
│  │         │     │                                        │ │
│  └─────────┘     └────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  Disclaimer | Privacy | Terms | © 2025 NIDA                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Sayfa Detayları

### 3.1 Landing Page

**Amaç:** Projeyi tanıtmak, güven vermek, kayıt yönlendirmek

**Bölümler:**
1. **Hero Section**
   - Başlık: "Çocuk Çizimlerini Anlayın"
   - Alt başlık: Akademik temelli HTP analizi
   - CTA: "Hemen Başlayın" → Register

2. **Nasıl Çalışır** (3 adım)
   - 1️⃣ Çizimi yükle
   - 2️⃣ AI analiz etsin
   - 3️⃣ Raporu incele

3. **Özellikler**
   - Akademik kaynaklara dayalı
   - Türkçe/İngilizce destek
   - Güvenli ve gizli

4. **Akademik Temel**
   - Referans gösterilen kaynaklar
   - Güven rozetleri

5. **Disclaimer Banner**
   - "Bu araç tanı koymaz, destekleyici bir araçtır"

### 3.2 Dashboard

**Amaç:** Hızlı özet, kolay erişim

**Bileşenler:**

```
┌─────────────────────────────────────────────────────────────┐
│  Hoş Geldin, [Kullanıcı Adı]!                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   📊 15      │  │   ⏱️ 3       │  │   📄 2       │      │
│  │   Toplam     │  │   Bu Hafta   │  │   Rapor      │      │
│  │   Analiz     │  │   Analiz     │  │   Bekliyor   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🚀 Hızlı Analiz                                     │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │                                             │    │   │
│  │  │     📁 Çizimi buraya sürükleyin            │    │   │
│  │  │        veya tıklayarak seçin               │    │   │
│  │  │                                             │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  📋 Son Analizler                          [Tümünü Gör →]   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🏠 Ev Çizimi    │ 8 yaş │ 2 saat önce │ ✅ Tamamlandı│   │
│  │  🌳 Ağaç Çizimi  │ 6 yaş │ 1 gün önce  │ ✅ Tamamlandı│   │
│  │  👤 İnsan Figürü │ 10 yaş│ 3 gün önce  │ ✅ Tamamlandı│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Analyze Page

**Amaç:** Çizim yükleme ve analiz başlatma

**Adımlar (Stepper):**

```
Step 1          Step 2          Step 3          Step 4
[●]────────────[○]────────────[○]────────────[○]
Çizim Yükle    Bilgi Gir      Analiz Et      Sonuç
```

**Step 1 - Çizim Yükle:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │              📁                                       │   │
│  │                                                       │   │
│  │     Çizimi buraya sürükleyin                         │   │
│  │     veya                                              │   │
│  │     [Dosya Seç]                                       │   │
│  │                                                       │   │
│  │     PNG, JPEG • Maks 10MB                            │   │
│  │                                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  💡 İpucu: Net, iyi aydınlatılmış fotoğraflar              │
│     daha doğru analiz sağlar.                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Step 2 - Bilgi Gir:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌───────────────┐   Çizim Bilgileri                       │
│  │               │                                          │
│  │   [Preview]   │   Çocuğun Yaşı *                        │
│  │               │   ┌─────────────────────────────┐       │
│  └───────────────┘   │ [Dropdown: 5-12]            │       │
│                      └─────────────────────────────┘       │
│                                                              │
│                      Cinsiyet (Opsiyonel)                   │
│                      ○ Kız  ○ Erkek  ○ Belirtmek İstemiyorum│
│                                                              │
│                      Çizim Türü *                           │
│                      ┌─────────────────────────────┐       │
│                      │ 🏠 Ev                       │       │
│                      │ 🌳 Ağaç                     │       │
│                      │ 👤 İnsan                    │       │
│                      │ 📋 Tam HTP (Üçü birden)    │       │
│                      └─────────────────────────────┘       │
│                                                              │
│                      Notlar (Opsiyonel)                     │
│                      ┌─────────────────────────────┐       │
│                      │                             │       │
│                      │                             │       │
│                      └─────────────────────────────┘       │
│                                                              │
│                                        [← Geri] [Analiz Et]│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Step 3 - Analiz (Processing):**
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                    🔄 Analiz Ediliyor...                    │
│                                                              │
│                    ████████████░░░░░░░  65%                 │
│                                                              │
│                    ✅ Çizim alındı                          │
│                    ✅ Elementler tespit ediliyor            │
│                    🔄 Yorumlar oluşturuluyor               │
│                    ○ Rapor hazırlanıyor                     │
│                                                              │
│                    Tahmini süre: ~8 saniye                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.4 Analysis Result Page

**Amaç:** Analiz sonuçlarını anlaşılır şekilde sunmak

```
┌─────────────────────────────────────────────────────────────┐
│  ← Geri    Analiz Sonucu                    [📥 PDF İndir] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐  ┌──────────────────────────────────┐  │
│  │                │  │  📊 Genel Değerlendirme          │  │
│  │   [Çizim]      │  │                                  │  │
│  │                │  │  Bu çizimde dikkat çeken öğeler  │  │
│  │                │  │  tespit edilmiştir. Detaylı      │  │
│  │                │  │  yorumlar aşağıda sunulmaktadır. │  │
│  │                │  │                                  │  │
│  │  🏠 Ev Çizimi  │  │  Güven Seviyesi: ████░ Orta     │  │
│  │  8 yaş, Kız    │  │                                  │  │
│  └────────────────┘  └──────────────────────────────────┘  │
│                                                              │
│  📋 Tespit Edilen Göstergeler                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  🚪 Küçük Kapı                      Güven: ██░ Orta  │  │
│  │  ─────────────────────────────────────────────────── │  │
│  │  Sosyal etkileşimde isteksizlik veya utangaçlık      │  │
│  │  gösterebilir. Çocuk çevreye karşı savunmacı bir     │  │
│  │  tutum içinde olabilir.                               │  │
│  │                                                        │  │
│  │  📚 Kaynaklar: Buck (1948), Hammer (1958)            │  │
│  │                                                        │  │
│  │  💡 Alternatif Görüş                          [Aç ▼] │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  🪟 Perdeli Pencereler              Güven: █░ Düşük  │  │
│  │  ─────────────────────────────────────────────────── │  │
│  │  Gizlilik ihtiyacı veya savunmacı tutum ile         │  │
│  │  ilişkilendirilebilir.                               │  │
│  │                                                        │  │
│  │  📚 Kaynaklar: Jolles (1971)                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  💬 Öneriler                                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • Çocukla sosyal ilişkiler hakkında konuşulabilir   │  │
│  │  • Aile ortamının değerlendirilmesi yararlı olabilir │  │
│  │  • Profesyonel değerlendirme önerilir                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ⚠️ Önemli Not                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Bu analiz bir tanı aracı değildir. Sonuçlar sadece  │  │
│  │  destekleyici bilgi olarak değerlendirilmelidir.     │  │
│  │  Kesin değerlendirme için uzman görüşü alınmalıdır.  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Bileşenler (Components)

### 4.1 Interpretation Card

```typescript
interface InterpretationCardProps {
  element: string;           // "Küçük Kapı"
  icon: string;              // "🚪"
  interpretation: string;    // Ana yorum
  confidence: 'low' | 'moderate' | 'high';
  sources: Source[];
  alternativeViews?: AlternativeView[];
}
```

**Görsel:**
```
┌─────────────────────────────────────────────────────┐
│  🚪 Küçük Kapı                    Güven: ██░ Orta  │
│  ───────────────────────────────────────────────── │
│  Sosyal etkileşimde isteksizlik veya utangaçlık    │
│  gösterebilir...                                    │
│                                                     │
│  📚 Buck (1948), Hammer (1958)   [Alternatif ▼]   │
└─────────────────────────────────────────────────────┘
```

### 4.2 Confidence Badge

```
Yüksek:  [████████████] Yüksek    (Yeşil)
Orta:    [████████░░░░] Orta      (Mavi)
Düşük:   [████░░░░░░░░] Düşük     (Sarı)
```

### 4.3 Source Citation

```
📚 Kaynaklar:
• Buck, J. N. (1948). The H-T-P Technique
• Hammer, E. F. (1958). Clinical Application of Projective Drawings
```

### 4.4 Disclaimer Banner

```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ Bu araç bir tanı aracı değildir. Sonuçlar akademik     │
│     literatüre dayalı yorumlar içerir ve kesin tanı        │
│     için profesyonel değerlendirme gereklidir.             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### Mobile Adaptasyonları

| Bileşen | Desktop | Mobile |
|---------|---------|--------|
| Sidebar | Sabit görünür | Hamburger menü |
| Analiz sonucu | 2 kolon | Tek kolon |
| İstatistik kartları | Yan yana | Üst üste |
| Upload area | Geniş | Tam genişlik |

---

## 6. Erişilebilirlik (Accessibility)

### WCAG 2.1 AA Gereksinimleri

| Gereksinim | Uygulama |
|------------|----------|
| **Renk kontrastı** | Min 4.5:1 (normal metin), 3:1 (büyük metin) |
| **Klavye navigasyonu** | Tüm interaktif öğeler tab ile erişilebilir |
| **Screen reader** | Anlamlı alt text, ARIA labels |
| **Focus indicators** | Görünür focus ring |
| **Error messages** | Açıklayıcı, yönlendirici |
| **Form labels** | Her input için açık label |

### Örnek ARIA Kullanımı

```html
<button
  aria-label="Analiz sonucunu PDF olarak indir"
  aria-describedby="download-help"
>
  📥 PDF İndir
</button>
<span id="download-help" class="sr-only">
  Sonuçları PDF formatında indirin
</span>
```

---

## 7. Loading States

### Skeleton Loading

```
┌─────────────────────────────────────────────────────┐
│  ████████████████                                   │
│  ──────────────────────────────────────────────     │
│  ████████████████████████████████████████████      │
│  ████████████████████████████████████████████      │
│  ████████████████████████                          │
└─────────────────────────────────────────────────────┘
```

### Progress Indicators

- Analiz: Stepped progress bar + durum mesajları
- Rapor: Spinner + yüzde
- Yükleme: Upload progress bar

---

## 8. Error States

### Empty States

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                     📋                              │
│                                                     │
│            Henüz analiz yapılmamış                 │
│                                                     │
│     İlk analizinizi yapmak için çizim yükleyin    │
│                                                     │
│              [➕ Yeni Analiz]                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Error States

```
┌─────────────────────────────────────────────────────┐
│  ❌ Analiz başarısız oldu                           │
│                                                     │
│  Çizim işlenirken bir hata oluştu.                 │
│  Lütfen tekrar deneyin.                            │
│                                                     │
│  [🔄 Tekrar Dene]  [📞 Destek]                     │
└─────────────────────────────────────────────────────┘
```

---

## 9. Micro-interactions

| Etkileşim | Animasyon |
|-----------|-----------|
| Button hover | Scale 1.02, subtle shadow |
| Card hover | Lift effect (translateY -2px) |
| Page transitions | Fade in (200ms) |
| Modal open | Scale from 0.95, fade |
| Success feedback | Checkmark animation |
| Upload drop | Border pulse, color change |

---

*Son Güncelleme: 2025-01-23*
*Versiyon: 1.0.0*
