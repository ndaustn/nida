import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: string = 'tr-TR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case 'high':
      return 'text-green-600 bg-green-100';
    case 'moderate':
      return 'text-blue-600 bg-blue-100';
    case 'low':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getConfidenceLabel(confidence: string, lang: string = 'tr'): string {
  const labels: Record<string, Record<string, string>> = {
    tr: { high: 'Yüksek', moderate: 'Orta', low: 'Düşük' },
    en: { high: 'High', moderate: 'Moderate', low: 'Low' },
  };
  return labels[lang]?.[confidence] || confidence;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}
