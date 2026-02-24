# NIDA - Technical Architecture

> Sistem Mimarisi ve Teknik Tasarım Dökümanı

---

## 1. Sistem Genel Görünümü

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              NIDA ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────────────────────┐│
│  │              │     │              │     │                              ││
│  │   Client     │────▶│   Next.js    │────▶│      Firebase Services       ││
│  │   (Browser)  │     │   (Vercel)   │     │                              ││
│  │              │◀────│              │◀────│  ┌─────────┐ ┌─────────────┐ ││
│  └──────────────┘     └──────────────┘     │  │Firestore│ │   Storage   │ ││
│                              │             │  └─────────┘ └─────────────┘ ││
│                              │             │  ┌─────────┐                 ││
│                              │             │  │  Auth   │                 ││
│                              ▼             │  └─────────┘                 ││
│                       ┌──────────────┐     └──────────────────────────────┘│
│                       │              │                                      │
│                       │  Gemini API  │                                      │
│                       │  (2.0 Flash) │                                      │
│                       │              │                                      │
│                       └──────────────┘                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Komponent Detayları

### 2.1 Frontend (Next.js 14)

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── analyze/          # Çizim analiz sayfası
│   │   ├── history/          # Geçmiş analizler
│   │   ├── reports/          # Raporlar
│   │   └── settings/         # Ayarlar
│   ├── api/
│   │   ├── analyze/          # Analiz endpoint
│   │   ├── reports/          # Rapor endpoint
│   │   └── knowledge-base/   # KB endpoint
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                   # Shadcn/ui components
│   ├── analysis/
│   │   ├── ImageUploader.tsx
│   │   ├── AnalysisResult.tsx
│   │   ├── InterpretationCard.tsx
│   │   └── SourceCitation.tsx
│   └── common/
├── lib/
│   ├── firebase.ts           # Firebase config
│   ├── gemini.ts             # Gemini client
│   ├── knowledge-base.ts     # KB utilities
│   └── utils.ts
├── hooks/
│   ├── useAnalysis.ts
│   └── useKnowledgeBase.ts
└── types/
    ├── analysis.ts
    ├── knowledge-base.ts
    └── user.ts
```

### 2.2 Backend (API Routes)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/analyze` | POST | Çizim analizi başlat |
| `/api/analyze/[id]` | GET | Analiz sonucu getir |
| `/api/reports` | GET/POST | Rapor listele/oluştur |
| `/api/reports/[id]/pdf` | GET | PDF export |
| `/api/knowledge-base` | GET | KB kurallarını getir |
| `/api/user/settings` | GET/PUT | Kullanıcı ayarları |

### 2.3 Database Schema (Firestore)

```typescript
// Collections

// users/{userId}
interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'counselor' | 'teacher' | 'admin';
  school?: string;
  language: 'tr' | 'en';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// analyses/{analysisId}
interface Analysis {
  id: string;
  userId: string;
  imageUrl: string;
  childAge: number;
  childGender?: 'male' | 'female' | 'other';
  drawingType: 'house' | 'tree' | 'person' | 'full_htp';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: AnalysisResult;
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

// analyses/{analysisId}/result (subcollection)
interface AnalysisResult {
  summary: string;
  interpretations: Interpretation[];
  overallAssessment: string;
  recommendations: string[];
  confidence: 'low' | 'moderate' | 'high';
  language: 'tr' | 'en';
}

interface Interpretation {
  element: string;           // 'hands', 'roof', 'tree_trunk'
  observation: string;       // 'Disproportionately large'
  interpretation: string;    // 'May indicate anxiety...'
  confidence: 'low' | 'moderate' | 'high';
  sources: Source[];
  alternativeViews?: AlternativeView[];
}

interface Source {
  author: string;
  year: number;
  title: string;
  type: 'book' | 'article' | 'meta_analysis';
}

interface AlternativeView {
  interpretation: string;
  source: Source;
}

// knowledgeBase/{ruleId}
interface KBRule {
  id: string;
  element: string;
  indicator: string;
  interpretation_tr: string;
  interpretation_en: string;
  confidence: 'low' | 'moderate' | 'high';
  sources: Source[];
  ageRelevance: {
    min: number;
    max: number;
  };
  category: 'emotional' | 'cognitive' | 'social' | 'trauma';
  contraindications?: string[];
  relatedRules?: string[];
}

// reports/{reportId}
interface Report {
  id: string;
  userId: string;
  analysisIds: string[];
  title: string;
  summary: string;
  createdAt: Timestamp;
  format: 'pdf' | 'docx';
}
```

---

## 3. Analiz Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ANALYSIS PIPELINE                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1. IMAGE UPLOAD                                                         │
│     ┌─────────┐     ┌─────────────┐     ┌─────────────────┐            │
│     │ Client  │────▶│  Validate   │────▶│ Firebase Storage│            │
│     │ Upload  │     │  (size/type)│     │    (save)       │            │
│     └─────────┘     └─────────────┘     └─────────────────┘            │
│                                                                          │
│  2. ANALYSIS REQUEST                                                     │
│     ┌─────────┐     ┌─────────────┐     ┌─────────────────┐            │
│     │ Create  │────▶│  Load KB    │────▶│ Build Prompt    │            │
│     │ Record  │     │  Rules      │     │ (image + KB)    │            │
│     └─────────┘     └─────────────┘     └─────────────────┘            │
│                                                                          │
│  3. LLM PROCESSING                                                       │
│     ┌─────────┐     ┌─────────────┐     ┌─────────────────┐            │
│     │ Gemini  │────▶│  Parse      │────▶│ Validate        │            │
│     │ API Call│     │  Response   │     │ Against KB      │            │
│     └─────────┘     └─────────────┘     └─────────────────┘            │
│                                                                          │
│  4. RESULT DELIVERY                                                      │
│     ┌─────────┐     ┌─────────────┐     ┌─────────────────┐            │
│     │ Save to │────▶│  Format     │────▶│ Return to       │            │
│     │Firestore│     │  Response   │     │ Client          │            │
│     └─────────┘     └─────────────┘     └─────────────────┘            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Gemini Integration

### 4.1 Prompt Yapısı

```typescript
const buildAnalysisPrompt = (
  imageBase64: string,
  kbRules: KBRule[],
  childAge: number,
  language: 'tr' | 'en'
) => {
  return `
You are NIDA, an expert child drawing analyst specializing in House-Tree-Person (HTP) psychological assessment.

## YOUR ROLE
- Analyze the provided HTP drawing based ONLY on the knowledge base rules provided
- Do NOT invent interpretations outside the knowledge base
- Always cite sources for your interpretations
- Present alternative views when conflicts exist in literature

## CHILD INFORMATION
- Age: ${childAge} years old

## KNOWLEDGE BASE RULES
${JSON.stringify(kbRules, null, 2)}

## CONFLICT RESOLUTION HIERARCHY
1. Meta-analysis findings take priority
2. Replicated findings (3+ studies) over single studies
3. Recent studies (last 10 years) over older ones
4. When equal weight: present BOTH interpretations

## OUTPUT FORMAT (JSON)
{
  "summary": "Brief overall summary",
  "interpretations": [
    {
      "element": "element name",
      "observation": "what was observed",
      "interpretation": "psychological interpretation",
      "confidence": "low|moderate|high",
      "sources": [{"author": "", "year": 0, "title": ""}],
      "alternativeViews": []
    }
  ],
  "overallAssessment": "comprehensive assessment",
  "recommendations": ["recommendation 1", "recommendation 2"],
  "confidence": "low|moderate|high"
}

## LANGUAGE
Respond in: ${language === 'tr' ? 'Turkish' : 'English'}

## IMPORTANT DISCLAIMERS
- This is a supportive tool, NOT a diagnostic instrument
- Professional evaluation is always recommended
- Single indicators are never conclusive

Now analyze the following HTP drawing:
`;
};
```

### 4.2 API Client

```typescript
// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeDrawing(
  imageBase64: string,
  prompt: string
): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      temperature: 0.3,  // Lower for consistency
      topP: 0.8,
      maxOutputTokens: 4096,
    }
  });

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64
      }
    }
  ]);

  const response = result.response.text();
  return JSON.parse(response);
}
```

---

## 5. Security

### 5.1 Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────────┐
│  User    │────▶│ Firebase │────▶│  JWT Token   │
│  Login   │     │   Auth   │     │  (verified)  │
└──────────┘     └──────────┘     └──────────────┘
                                         │
                      ┌──────────────────┘
                      ▼
              ┌──────────────┐
              │  API Routes  │
              │  (protected) │
              └──────────────┘
```

### 5.2 Security Measures

| Önlem | Açıklama |
|-------|----------|
| **Authentication** | Firebase Auth (email/password) |
| **Authorization** | Role-based access (counselor, teacher, admin) |
| **Data Encryption** | Firestore encryption at rest |
| **Image Privacy** | Signed URLs, 24h expiry |
| **Rate Limiting** | 100 analyses/day per user |
| **Input Validation** | Zod schemas for all inputs |
| **CORS** | Strict origin policy |

---

## 6. Scalability

### 6.1 Current Design (MVP)

- Vercel serverless functions
- Firebase free tier
- Single region deployment

### 6.2 Future Scaling Options

| Bottleneck | Solution |
|------------|----------|
| Gemini API limits | Request queuing, caching |
| Firestore reads | Denormalization, caching |
| Image processing | Cloud Functions, CDN |
| Global latency | Multi-region deployment |

---

## 7. Monitoring & Logging

```typescript
// Recommended services
- Vercel Analytics (built-in)
- Firebase Analytics
- Sentry (error tracking)
- Custom logging to Firestore
```

### Key Metrics to Track

| Metric | Purpose |
|--------|---------|
| Analysis duration | Performance |
| Error rate | Reliability |
| API costs | Budget |
| User engagement | Product |
| Interpretation accuracy | Quality |

---

## 8. Development Environment

### 8.1 Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0
Firebase CLI
Vercel CLI (optional)
```

### 8.2 Environment Variables

```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

GEMINI_API_KEY=
```

### 8.3 Setup Commands

```bash
# Clone and install
git clone https://github.com/username/nida.git
cd nida
npm install

# Setup Firebase
firebase login
firebase init

# Run development server
npm run dev

# Build for production
npm run build
```

---

*Son Güncelleme: 2025-01-23*
*Versiyon: 1.0.0*
