// NIDA Type Definitions

export type Language = 'tr' | 'en';
export type UserRole = 'counselor' | 'teacher' | 'admin';
export type DrawingType = 'house' | 'tree' | 'person' | 'full_htp';
export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type ConfidenceLevel = 'low' | 'moderate' | 'high';
export type EvidenceStrength = 'meta_analysis' | 'replicated' | 'single_study' | 'clinical_consensus' | 'theoretical';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  school?: string;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analysis {
  id: string;
  userId: string;
  imageUrl: string;
  childAge: number;
  childGender?: 'male' | 'female' | 'other';
  drawingType: DrawingType;
  status?: AnalysisStatus;
  language?: Language;
  interpretations?: Interpretation[];
  summary?: string;
  recommendations?: string[];
  result?: AnalysisResult;
  createdAt: { toDate: () => Date } | Date;
  completedAt?: Date;
  notes?: string;
}

export interface SpatialAnalysis {
  composition?: string;
  placement?: string;
  size?: string;
  pressure?: string;
  [key: string]: string | undefined;
}

export interface AnalysisResult {
  summary: string;
  interpretations: Interpretation[];
  overallAssessment: string;
  recommendations: string[];
  confidence: ConfidenceLevel;
  language: Language;
  spatialAnalysis?: SpatialAnalysis;
  developmentalNotes?: string;
}

export interface Interpretation {
  element: string;
  observation: string;
  interpretation: string;
  confidence: ConfidenceLevel;
  boundingBox?: [number, number, number, number];
  sources: AcademicSource[];
  alternativeViews?: AlternativeView[];
}

export interface AlternativeView {
  interpretation: string;
  source: AcademicSource;
}

export interface AcademicSource {
  id: string;
  author: string;
  year: number;
  title: string;
  type: 'book' | 'article' | 'meta_analysis';
}

export interface KBRule {
  id: string;
  element: string;
  category: 'house' | 'tree' | 'person' | 'general';
  indicator: string;
  interpretation: {
    tr: string;
    en: string;
  };
  confidence: ConfidenceLevel;
  evidenceStrength: EvidenceStrength;
  sources: AcademicSource[];
  ageRange: {
    min: number;
    max: number;
  };
  tags: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
