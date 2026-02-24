# NIDA - API Specification

> RESTful API Endpoint Tanımları

---

## 1. Genel Bilgiler

### Base URL
```
Production: https://nida.vercel.app/api
Development: http://localhost:3000/api
```

### Authentication
Tüm endpoint'ler (auth hariç) Firebase ID Token gerektirir.

```http
Authorization: Bearer <firebase_id_token>
```

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
  };
}
```

### Error Codes
| Code | HTTP Status | Açıklama |
|------|-------------|----------|
| `AUTH_REQUIRED` | 401 | Token eksik veya geçersiz |
| `FORBIDDEN` | 403 | Yetkisiz erişim |
| `NOT_FOUND` | 404 | Kaynak bulunamadı |
| `VALIDATION_ERROR` | 400 | Geçersiz input |
| `RATE_LIMITED` | 429 | İstek limiti aşıldı |
| `INTERNAL_ERROR` | 500 | Sunucu hatası |
| `LLM_ERROR` | 502 | Gemini API hatası |

---

## 2. Authentication Endpoints

### 2.1 Register User
```http
POST /api/auth/register
```

**Request Body:**
```typescript
{
  email: string;          // Valid email
  password: string;       // Min 8 chars
  displayName: string;    // 2-50 chars
  role: 'counselor' | 'teacher';
  school?: string;
}
```

**Response (201):**
```typescript
{
  success: true,
  data: {
    user: {
      id: string;
      email: string;
      displayName: string;
      role: string;
    }
  }
}
```

### 2.2 Get Current User
```http
GET /api/auth/me
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    user: User;
  }
}
```

---

## 3. Analysis Endpoints

### 3.1 Create Analysis
```http
POST /api/analyze
Content-Type: multipart/form-data
```

**Request Body:**
```typescript
{
  image: File;                    // JPEG, PNG, max 10MB
  childAge: number;               // 5-12
  childGender?: 'male' | 'female' | 'other';
  drawingType: 'house' | 'tree' | 'person' | 'full_htp';
  language?: 'tr' | 'en';         // Default: user preference
  notes?: string;                 // Max 500 chars
}
```

**Response (202):**
```typescript
{
  success: true,
  data: {
    analysisId: string;
    status: 'processing';
    estimatedTime: number;        // seconds
  }
}
```

### 3.2 Get Analysis Result
```http
GET /api/analyze/:analysisId
```

**Response (200) - Completed:**
```typescript
{
  success: true,
  data: {
    analysis: {
      id: string;
      status: 'completed';
      imageUrl: string;
      childAge: number;
      childGender?: string;
      drawingType: string;
      createdAt: string;
      completedAt: string;
      result: {
        summary: string;
        interpretations: Interpretation[];
        overallAssessment: string;
        recommendations: string[];
        confidence: 'low' | 'moderate' | 'high';
        language: 'tr' | 'en';
      }
    }
  }
}
```

**Response (200) - Processing:**
```typescript
{
  success: true,
  data: {
    analysis: {
      id: string;
      status: 'processing';
      progress: number;           // 0-100
    }
  }
}
```

### 3.3 List Analyses
```http
GET /api/analyze
```

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page (max 50) |
| `status` | string | all | Filter by status |
| `drawingType` | string | all | Filter by type |
| `startDate` | ISO date | - | Filter by date range |
| `endDate` | ISO date | - | Filter by date range |

**Response (200):**
```typescript
{
  success: true,
  data: {
    analyses: Analysis[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }
  }
}
```

### 3.4 Delete Analysis
```http
DELETE /api/analyze/:analysisId
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    deleted: true;
  }
}
```

---

## 4. Report Endpoints

### 4.1 Create Report
```http
POST /api/reports
```

**Request Body:**
```typescript
{
  title: string;                  // 5-100 chars
  analysisIds: string[];          // 1-10 analysis IDs
  includeImages: boolean;         // Include drawings in report
  format: 'pdf' | 'docx';
  language: 'tr' | 'en';
}
```

**Response (202):**
```typescript
{
  success: true,
  data: {
    reportId: string;
    status: 'generating';
  }
}
```

### 4.2 Get Report
```http
GET /api/reports/:reportId
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    report: {
      id: string;
      title: string;
      status: 'ready' | 'generating' | 'failed';
      downloadUrl?: string;       // Signed URL, 24h expiry
      createdAt: string;
      expiresAt?: string;
    }
  }
}
```

### 4.3 List Reports
```http
GET /api/reports
```

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |

**Response (200):**
```typescript
{
  success: true,
  data: {
    reports: Report[];
    pagination: Pagination;
  }
}
```

---

## 5. Knowledge Base Endpoints

### 5.1 Get KB Rules
```http
GET /api/knowledge-base
```

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `category` | string | all | house, tree, person, general |
| `element` | string | - | Specific element |
| `confidence` | string | - | low, moderate, high |
| `ageMin` | number | - | Minimum age |
| `ageMax` | number | - | Maximum age |

**Response (200):**
```typescript
{
  success: true,
  data: {
    rules: KBRule[];
    total: number;
  }
}
```

### 5.2 Get Single Rule
```http
GET /api/knowledge-base/:ruleId
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    rule: KBRule;
  }
}
```

### 5.3 Search KB
```http
GET /api/knowledge-base/search
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Search query |
| `tags` | string | Comma-separated tags |
| `limit` | number | Max results (default 20) |

**Response (200):**
```typescript
{
  success: true,
  data: {
    results: KBRule[];
    total: number;
  }
}
```

---

## 6. User Settings Endpoints

### 6.1 Get Settings
```http
GET /api/user/settings
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    settings: {
      language: 'tr' | 'en';
      emailNotifications: boolean;
      defaultDrawingType: string;
      theme: 'light' | 'dark' | 'system';
    }
  }
}
```

### 6.2 Update Settings
```http
PUT /api/user/settings
```

**Request Body:**
```typescript
{
  language?: 'tr' | 'en';
  emailNotifications?: boolean;
  defaultDrawingType?: string;
  theme?: 'light' | 'dark' | 'system';
}
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    settings: UserSettings;
  }
}
```

---

## 7. Admin Endpoints (Role: admin)

### 7.1 Get Usage Statistics
```http
GET /api/admin/stats
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    stats: {
      totalUsers: number;
      totalAnalyses: number;
      analysesToday: number;
      averageAnalysisTime: number;
      topDrawingTypes: { type: string; count: number }[];
      apiCosts: {
        today: number;
        thisMonth: number;
      };
    }
  }
}
```

### 7.2 Manage KB Rules (CRUD)
```http
POST   /api/admin/knowledge-base
PUT    /api/admin/knowledge-base/:ruleId
DELETE /api/admin/knowledge-base/:ruleId
```

---

## 8. Webhook Endpoints

### 8.1 Analysis Complete Webhook
Analiz tamamlandığında (opsiyonel) callback.

```http
POST <user_webhook_url>
```

**Payload:**
```typescript
{
  event: 'analysis.completed';
  data: {
    analysisId: string;
    status: 'completed' | 'failed';
    timestamp: string;
  };
  signature: string;              // HMAC-SHA256
}
```

---

## 9. Rate Limits

| Endpoint Group | Limit | Window |
|----------------|-------|--------|
| `/api/analyze` (POST) | 100 | per day |
| `/api/analyze` (GET) | 1000 | per hour |
| `/api/reports` | 50 | per day |
| `/api/knowledge-base` | 500 | per hour |
| General | 10000 | per day |

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706054400
```

---

## 10. OpenAPI Specification

Tam OpenAPI 3.0 spec dosyası:
```
/api/openapi.json
/api/docs (Swagger UI)
```

---

*Son Güncelleme: 2025-01-23*
*Versiyon: 1.0.0*
