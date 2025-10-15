// Enhanced OCR Service using Tesseract.js with improved accuracy
import { createWorker } from 'tesseract.js';

export interface OCRResponse {
  text: string;
  confidence: number;
}

// Preprocess image for better OCR accuracy
async function preprocessImage(file: File): Promise<string> {
  return new Promise((resolve) => {
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

        // Set canvas size (upscale small images)
        const minWidth = 1200;
        const scale = img.width < minWidth ? minWidth / img.width : 1;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Draw image with scaling
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply grayscale and increase contrast
        for (let i = 0; i < data.length; i += 4) {
          // Convert to grayscale
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          
          // Apply adaptive contrast
          const threshold = 128;
          const contrast = 1.5;
          const adjusted = ((gray - threshold) * contrast) + threshold;
          const newValue = Math.max(0, Math.min(255, adjusted));
          
          data[i] = newValue;     // Red
          data[i + 1] = newValue; // Green
          data[i + 2] = newValue; // Blue
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL());
      };
      img.onerror = () => resolve(URL.createObjectURL(file));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(URL.createObjectURL(file));
    reader.readAsDataURL(file);
  });
}

export async function performOCR(file: File): Promise<OCRResponse> {
  try {
    // console.log('🔍 Starting OCR process...');
    // console.log('📄 File:', file.name, '| Size:', (file.size / 1024).toFixed(2), 'KB');
    
    // Preprocess image for better accuracy
    // console.log('⚙️ Preprocessing image...');
    const processedImage = await preprocessImage(file);
    
    // Create Tesseract worker with optimized settings
    // console.log('🤖 Initializing Tesseract worker...');
    const worker = await createWorker('eng', 1, {
      logger: (m) => {
        // console.log('Tesseract:', m);
        if (m.status === 'recognizing text') {
          // console.log(`📊 OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    // Perform OCR on the preprocessed image
    console.log('📝 Extracting text from image...');
    const { data } = await worker.recognize(processedImage);
    
    // Clean up worker
    await worker.terminate();

    // console.log('✅ OCR completed successfully!');
    // console.log('📊 Confidence:', (data.confidence).toFixed(2) + '%');
    // console.log('📝 Extracted text length:', data.text.length, 'characters');
    // console.log('📄 Extracted text:', data.text.substring(0, 100) + '...');
    
    // Clean up the extracted text
    const cleanedText = data.text.trim();
    
    if (!cleanedText || cleanedText.length < 5) {
      return {
        text: 'No text detected in the image. Please ensure:\n- Image contains readable text\n- Text is clear and not blurry\n- Good lighting without shadows\n- High resolution image',
        confidence: 0,
      };
    }
    
    return {
      text: cleanedText,
      confidence: data.confidence / 100,
    };
  } catch (error) {
    console.error('❌ OCR Error:', error);
    
    return {
      text: 'OCR processing failed. Error: ' + (error instanceof Error ? error.message : 'Unknown error') + '\n\nPlease try again with a clearer image.',
      confidence: 0,
    };
  }
}

// For better handwriting recognition, use Google Cloud Vision API:
/*
export async function performOCR(file: File): Promise<OCRResponse> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('YOUR_BACKEND_API/ocr', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  return {
    text: result.text,
    confidence: result.confidence,
  };
}
*/

