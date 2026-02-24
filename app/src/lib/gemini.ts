// Gemini API Client - Uses server-side API route for security
import { KBRule, AnalysisResult, Language } from '@/types';

export async function analyzeDrawing(
  imageBase64: string,
  mimeType: string,
  childAge: number,
  drawingType: string,
  _kbRules: KBRule[],
  language: Language = 'tr'
): Promise<AnalysisResult> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageBase64,
      mimeType,
      childAge,
      drawingType,
      language,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Analysis failed');
  }

  return response.json();
}
