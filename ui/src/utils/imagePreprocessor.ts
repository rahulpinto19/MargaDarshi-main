// Image preprocessing utilities for better OCR accuracy

export interface PreprocessOptions {
  grayscale?: boolean;
  contrast?: boolean;
  brightness?: number;
  sharpen?: boolean;
}

export async function preprocessImageForOCR(
  file: File,
  options: PreprocessOptions = {}
): Promise<string> {
  const {
    grayscale = true,
    contrast = true,
    brightness = 1.2,
    sharpen = false,
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(URL.createObjectURL(file));
          return;
        }

        // Set canvas size (upscale if image is too small)
        const minWidth = 1200;
        const scale = img.width < minWidth ? minWidth / img.width : 1;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Draw image with scaling
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply preprocessing
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          // Apply brightness
          r = Math.min(255, r * brightness);
          g = Math.min(255, g * brightness);
          b = Math.min(255, b * brightness);

          if (grayscale) {
            // Convert to grayscale
            const gray = r * 0.299 + g * 0.587 + b * 0.114;

            if (contrast) {
              // Apply adaptive thresholding for better contrast
              const threshold = 128;
              const contrastFactor = 1.5;
              const adjusted = ((gray - threshold) * contrastFactor) + threshold;
              const final = Math.max(0, Math.min(255, adjusted));

              data[i] = final;
              data[i + 1] = final;
              data[i + 2] = final;
            } else {
              data[i] = gray;
              data[i + 1] = gray;
              data[i + 2] = gray;
            }
          } else {
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
          }
        }

        // Apply sharpening if enabled
        if (sharpen) {
          applySharpen(imageData);
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = () => {
        console.error('Failed to load image for preprocessing');
        resolve(URL.createObjectURL(file));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      console.error('Failed to read file');
      resolve(URL.createObjectURL(file));
    };

    reader.readAsDataURL(file);
  });
}

function applySharpen(imageData: ImageData): void {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  // Sharpening kernel
  const kernel = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
  ];

  const tempData = new Uint8ClampedArray(data);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4 + c;
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            sum += tempData[idx] * kernel[kernelIdx];
          }
        }
        const idx = (y * width + x) * 4 + c;
        data[idx] = Math.max(0, Math.min(255, sum));
      }
    }
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/tiff'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPG, PNG, BMP, or TIFF images.',
    };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 10MB.',
    };
  }

  return { valid: true };
}

