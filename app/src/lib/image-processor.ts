/**
 * Utility for client-side image pre-processing.
 * Boosts contrast and normalizes pencil drawings for better AI analysis.
 */
export async function preprocessDrawing(file: File): Promise<{
  processedBase64: string;
  originalBase64: string;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context not available"));
          return;
        }

        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply Grayscale and Contrast boost
        // Logic: Convert to grayscale, then use a threshold/contrast formula
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Grayscale (Luminance)
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          
          // Simple Contrast Boost: Push pixels towards black or white
          // Pencil drawings are often low contrast.
          let final = gray;
          if (gray > 200) final = 255; // Remove paper noise
          else if (gray < 100) final = Math.max(0, final - 30); // Darken pencil strokes
          
          data[i] = final;
          data[i + 1] = final;
          data[i + 2] = final;
        }

        ctx.putImageData(imageData, 0, 0);
        
        const processedBase64 = canvas.toDataURL("image/jpeg", 0.9);
        const originalBase64 = e.target?.result as string;

        resolve({ processedBase64, originalBase64 });
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
