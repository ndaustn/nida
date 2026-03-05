// Gemini API Client — calls the server-side API route with Firebase auth token
import { KBRule, AnalysisResult, Language } from "@/types";
import { auth } from "@/lib/firebase";

export async function analyzeDrawing(
  imageBase64: string,
  mimeType: string,
  childAge: number,
  drawingType: string,
  _kbRules: KBRule[], // age-aware filtering is done server-side
  language: Language = "tr"
): Promise<AnalysisResult> {
  // Retrieve Firebase ID token for authenticated API call
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    throw new Error(
      "Kimlik doğrulaması gereklidir. Lütfen yeniden giriş yapın."
    );
  }


  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

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
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.message || errorBody.error || "Analiz başarısız oldu."
    );
  }

  return response.json();
}
