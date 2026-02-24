# NIDA - Knowledge Base Schema

> Akademik Literatüre Dayalı Yorum Kuralları Yapısı

---

## 1. Genel Bakış

Knowledge Base (KB), NIDA'nın temelini oluşturur. Akademik literatürden çıkarılan yorumlama kurallarını yapılandırılmış formatta saklar.

### Tasarım Prensipleri

| Prensip | Açıklama |
|---------|----------|
| **Kaynak Zorunluluğu** | Her kural en az 1 akademik kaynağa dayanmalı |
| **Çelişki Toleransı** | Farklı yorumlar aynı gösterge için saklanabilir |
| **Yaş Duyarlılığı** | Kurallar yaş aralığına göre filtrelenebilir |
| **Çok Dillilik** | Yorumlar TR/EN olarak saklanır |
| **Güven Seviyesi** | Her kural için confidence belirtilir |

---

## 2. KB Rule Schema

### 2.1 Ana Yapı

```typescript
interface KBRule {
  // Identifiers
  id: string;                    // Unique ID: "KB-HOUSE-001"
  version: number;               // Schema version

  // Drawing Element
  element: DrawingElement;       // Which element this rule applies to
  category: ElementCategory;     // house | tree | person | general

  // Indicator
  indicator: Indicator;          // What to look for

  // Interpretation
  interpretation: {
    tr: string;                  // Turkish interpretation
    en: string;                  // English interpretation
  };

  // Confidence & Validity
  confidence: ConfidenceLevel;
  evidenceStrength: EvidenceStrength;
  replicationCount: number;      // How many studies support this

  // Sources
  sources: AcademicSource[];
  primarySource: string;         // ID of the most authoritative source

  // Applicability
  ageRange: {
    min: number;
    max: number;
  };
  genderSpecific?: 'male' | 'female' | null;
  culturalNotes?: string;

  // Relationships
  contraindications?: string[];  // When NOT to apply this rule
  relatedRules?: string[];       // Related rule IDs
  conflictsWith?: string[];      // Conflicting rule IDs

  // Metadata
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  reviewedBy?: string;
}
```

### 2.2 Enum Tanımları

```typescript
type DrawingElement =
  // House elements
  | 'house_overall' | 'house_size' | 'house_placement'
  | 'roof' | 'roof_size' | 'roof_type'
  | 'walls' | 'door' | 'door_size' | 'door_placement'
  | 'windows' | 'window_count' | 'window_size'
  | 'chimney' | 'chimney_smoke'
  | 'pathway' | 'fence' | 'garden'

  // Tree elements
  | 'tree_overall' | 'tree_size' | 'tree_placement'
  | 'trunk' | 'trunk_size' | 'trunk_shape'
  | 'branches' | 'branch_direction' | 'branch_type'
  | 'roots' | 'leaves' | 'fruits'
  | 'tree_ground' | 'tree_hole' | 'tree_scar'

  // Person elements
  | 'person_overall' | 'person_size' | 'person_placement'
  | 'head' | 'head_size' | 'face'
  | 'eyes' | 'eye_size' | 'eye_detail'
  | 'nose' | 'mouth' | 'mouth_expression'
  | 'ears' | 'hair'
  | 'neck' | 'neck_length'
  | 'body' | 'body_shape'
  | 'arms' | 'arm_position' | 'arm_length'
  | 'hands' | 'hand_size' | 'fingers'
  | 'legs' | 'leg_length'
  | 'feet' | 'clothing'
  | 'genitals'

  // General elements
  | 'line_quality' | 'pressure' | 'shading'
  | 'erasures' | 'symmetry' | 'detail_level'
  | 'color_usage' | 'ground_line' | 'baseline'
  | 'overall_composition';

type ElementCategory = 'house' | 'tree' | 'person' | 'general';

type Indicator =
  | 'absent' | 'present' | 'emphasized'
  | 'disproportionately_large' | 'disproportionately_small'
  | 'omitted' | 'distorted' | 'detached'
  | 'reinforced' | 'shaded' | 'transparent'
  | 'heavy_pressure' | 'light_pressure'
  | 'placed_left' | 'placed_right' | 'placed_center'
  | 'placed_top' | 'placed_bottom'
  | 'detailed' | 'simplified' | 'bizarre'
  | 'open' | 'closed' | 'hidden'
  | 'multiple' | 'single' | 'none'
  | 'connected' | 'disconnected'
  | 'ascending' | 'descending' | 'horizontal'
  | 'curved' | 'angular' | 'broken';

type ConfidenceLevel = 'low' | 'moderate' | 'high';

type EvidenceStrength =
  | 'meta_analysis'      // Strongest
  | 'replicated'         // 3+ studies
  | 'single_study'       // 1-2 studies
  | 'clinical_consensus' // Expert agreement, limited empirical
  | 'theoretical';       // Theory-based, minimal empirical
```

### 2.3 Academic Source Schema

```typescript
interface AcademicSource {
  id: string;                    // "BUCK-1948"
  author: string;                // "Buck, J. N."
  year: number;                  // 1948
  title: string;                 // "The H-T-P Technique..."
  type: SourceType;
  journal?: string;
  publisher?: string;
  doi?: string;
  isbn?: string;
  pages?: string;
  url?: string;
  accessDate?: Date;
}

type SourceType =
  | 'book'
  | 'book_chapter'
  | 'journal_article'
  | 'meta_analysis'
  | 'systematic_review'
  | 'dissertation'
  | 'conference_paper';
```

---

## 3. Örnek KB Kuralları

### 3.1 House (Ev) Kuralları

```json
{
  "id": "KB-HOUSE-001",
  "version": 1,
  "element": "door_size",
  "category": "house",
  "indicator": "disproportionately_small",
  "interpretation": {
    "tr": "Küçük veya dar kapı, sosyal etkileşimde isteksizlik, utangaçlık veya çevreye karşı savunmacı tutum gösterebilir. Çocuk kendini dış dünyadan izole hissediyor olabilir.",
    "en": "A small or narrow door may indicate reluctance in social interaction, shyness, or a defensive attitude toward the environment. The child may feel isolated from the outside world."
  },
  "confidence": "moderate",
  "evidenceStrength": "replicated",
  "replicationCount": 5,
  "sources": [
    {
      "id": "BUCK-1948",
      "author": "Buck, J. N.",
      "year": 1948,
      "title": "The H-T-P Technique: A Qualitative and Quantitative Scoring Manual",
      "type": "book"
    },
    {
      "id": "HAMMER-1958",
      "author": "Hammer, E. F.",
      "year": 1958,
      "title": "The Clinical Application of Projective Drawings",
      "type": "book"
    }
  ],
  "primarySource": "BUCK-1948",
  "ageRange": { "min": 5, "max": 12 },
  "tags": ["social", "isolation", "defense"],
  "relatedRules": ["KB-HOUSE-002", "KB-HOUSE-015"],
  "createdAt": "2025-01-23",
  "updatedAt": "2025-01-23"
}
```

### 3.2 Tree (Ağaç) Kuralları

```json
{
  "id": "KB-TREE-001",
  "version": 1,
  "element": "trunk_size",
  "category": "tree",
  "indicator": "disproportionately_large",
  "interpretation": {
    "tr": "Büyük gövde, güçlü ego yapısı veya çevresel baskılara karşı direnç gösterebilir. Ancak aşırı büyük gövde, saldırganlık veya kontrol ihtiyacı ile de ilişkilendirilebilir.",
    "en": "A large trunk may indicate a strong ego structure or resistance to environmental pressures. However, an excessively large trunk can also be associated with aggression or a need for control."
  },
  "confidence": "moderate",
  "evidenceStrength": "replicated",
  "replicationCount": 4,
  "sources": [
    {
      "id": "KOCH-1952",
      "author": "Koch, C.",
      "year": 1952,
      "title": "The Tree Test",
      "type": "book"
    },
    {
      "id": "BOLANDER-1977",
      "author": "Bolander, K.",
      "year": 1977,
      "title": "Assessing Personality Through Tree Drawings",
      "type": "book"
    }
  ],
  "primarySource": "KOCH-1952",
  "ageRange": { "min": 5, "max": 12 },
  "tags": ["ego", "strength", "aggression"],
  "conflictsWith": ["KB-TREE-002"],
  "createdAt": "2025-01-23",
  "updatedAt": "2025-01-23"
}
```

### 3.3 Person (İnsan) Kuralları

```json
{
  "id": "KB-PERSON-001",
  "version": 1,
  "element": "hands",
  "category": "person",
  "indicator": "disproportionately_large",
  "interpretation": {
    "tr": "Büyük eller, çevreyle etkileşimde zorluk, anksiyete veya suçluluk duygusu ile ilişkilendirilebilir. Ayrıca saldırganlık veya güç ihtiyacını da gösterebilir.",
    "en": "Large hands may be associated with difficulty in interacting with the environment, anxiety, or feelings of guilt. They may also indicate aggression or a need for power."
  },
  "confidence": "moderate",
  "evidenceStrength": "replicated",
  "replicationCount": 6,
  "sources": [
    {
      "id": "MACHOVER-1949",
      "author": "Machover, K.",
      "year": 1949,
      "title": "Personality Projection in the Drawing of the Human Figure",
      "type": "book"
    },
    {
      "id": "HAMMER-1958",
      "author": "Hammer, E. F.",
      "year": 1958,
      "title": "The Clinical Application of Projective Drawings",
      "type": "book"
    },
    {
      "id": "KOPPITZ-1968",
      "author": "Koppitz, E. M.",
      "year": 1968,
      "title": "Psychological Evaluation of Children's Human Figure Drawings",
      "type": "book"
    }
  ],
  "primarySource": "MACHOVER-1949",
  "ageRange": { "min": 5, "max": 12 },
  "tags": ["anxiety", "guilt", "aggression", "interaction"],
  "contraindications": ["Motor skill delays may cause size distortions unrelated to psychology"],
  "createdAt": "2025-01-23",
  "updatedAt": "2025-01-23"
}
```

### 3.4 Çelişkili Kural Örneği

```json
{
  "id": "KB-PERSON-002",
  "version": 1,
  "element": "hands",
  "category": "person",
  "indicator": "omitted",
  "interpretation": {
    "tr": "Ellerin çizilmemesi, güçsüzlük hissi, suçluluk veya çevreyle etkileşimden kaçınma ile ilişkilendirilebilir.",
    "en": "Omission of hands may be associated with feelings of helplessness, guilt, or avoidance of interaction with the environment."
  },
  "confidence": "moderate",
  "evidenceStrength": "replicated",
  "replicationCount": 5,
  "sources": [
    {
      "id": "MACHOVER-1949",
      "author": "Machover, K.",
      "year": 1949,
      "title": "Personality Projection in the Drawing of the Human Figure",
      "type": "book"
    }
  ],
  "primarySource": "MACHOVER-1949",
  "ageRange": { "min": 7, "max": 12 },
  "tags": ["guilt", "helplessness", "avoidance"],
  "contraindications": [
    "Children under 7 may omit hands due to developmental stage, not psychological reasons",
    "Check Lowenfeld's developmental stages before interpreting"
  ],
  "createdAt": "2025-01-23",
  "updatedAt": "2025-01-23"
}
```

---

## 4. Çelişki Yönetimi

### 4.1 Çelişki Tespiti

```typescript
interface ConflictResolution {
  ruleA: string;           // First rule ID
  ruleB: string;           // Conflicting rule ID
  resolutionStrategy: ResolutionStrategy;
  resolvedInterpretation?: string;
  presentBoth: boolean;    // Show both to user?
  notes: string;
}

type ResolutionStrategy =
  | 'meta_analysis_priority'    // Meta-analysis wins
  | 'replication_priority'      // More replicated wins
  | 'recency_priority'          // More recent wins
  | 'present_both'              // Show both interpretations
  | 'context_dependent';        // Depends on other factors
```

### 4.2 Çelişki Çözüm Hiyerarşisi

```
PRIORITY ORDER:
1. Meta-analysis / Systematic review
2. Replicated findings (3+ studies)
3. Recent studies (last 10 years)
4. Classic sources (foundational texts)
5. Present both (when equal weight)
```

---

## 5. KB Yönetim API'leri

### 5.1 CRUD Operations

```typescript
// Create new rule
POST /api/knowledge-base
Body: KBRule

// Get all rules
GET /api/knowledge-base
Query: ?category=house&element=door

// Get specific rule
GET /api/knowledge-base/{ruleId}

// Update rule
PUT /api/knowledge-base/{ruleId}
Body: Partial<KBRule>

// Delete rule
DELETE /api/knowledge-base/{ruleId}

// Search rules
GET /api/knowledge-base/search
Query: ?q=anxiety&tags=trauma
```

### 5.2 Query Helpers

```typescript
// Get rules for specific element
getKBRulesForElement(element: DrawingElement): KBRule[]

// Get rules within age range
getKBRulesForAge(age: number): KBRule[]

// Get conflicting rules
getConflictingRules(ruleId: string): KBRule[]

// Get rules by evidence strength
getKBRulesByEvidence(strength: EvidenceStrength): KBRule[]
```

---

## 6. KB Popülasyonu Stratejisi

### 6.1 Kaynak Önceliklendirme

| Öncelik | Kaynak Tipi | Örnekler |
|---------|-------------|----------|
| 1 | Meta-analizler | Lilienfeld et al. (2000) |
| 2 | Klasik temel eserler | Buck (1948), Hammer (1958), Machover (1949) |
| 3 | Güncel araştırmalar | Son 10 yıl içindeki peer-reviewed makaleler |
| 4 | Klinik el kitapları | Groth-Marnat assessment guides |

### 6.2 Tahmini KB Boyutu

| Kategori | Tahmini Kural Sayısı |
|----------|----------------------|
| House | ~50 rules |
| Tree | ~40 rules |
| Person | ~80 rules |
| General | ~30 rules |
| **TOPLAM** | **~200 rules** |

---

## 7. Validasyon

### 7.1 Rule Validation Schema (Zod)

```typescript
import { z } from 'zod';

const KBRuleSchema = z.object({
  id: z.string().regex(/^KB-[A-Z]+-\d{3}$/),
  element: z.enum([/* DrawingElement values */]),
  category: z.enum(['house', 'tree', 'person', 'general']),
  indicator: z.enum([/* Indicator values */]),
  interpretation: z.object({
    tr: z.string().min(20),
    en: z.string().min(20),
  }),
  confidence: z.enum(['low', 'moderate', 'high']),
  evidenceStrength: z.enum([
    'meta_analysis', 'replicated', 'single_study',
    'clinical_consensus', 'theoretical'
  ]),
  sources: z.array(AcademicSourceSchema).min(1),
  ageRange: z.object({
    min: z.number().min(3).max(18),
    max: z.number().min(3).max(18),
  }),
});
```

---

*Son Güncelleme: 2025-01-23*
*Versiyon: 1.0.0*
