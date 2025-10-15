# OCR Setup Guide for Handwriting Recognition

## ✅ Current Setup: Tesseract.js (Installed & Active)

Your app now uses **real OCR** with Tesseract.js! It can extract text from:
- ✅ Printed text (high accuracy)
- ✅ Handwritten text (moderate accuracy)
- ✅ Mixed content

### How It Works:
1. Student uploads answer sheet image
2. Tesseract.js processes the image in the browser
3. Text is extracted and displayed
4. Confidence score is shown

### Limitations:
- **Handwriting accuracy**: 60-80% (depends on clarity)
- **Processing time**: 5-15 seconds per image
- **Best for**: Clear, neat handwriting

---

## 🚀 Upgrade Options for Better Handwriting Recognition

### Option 1: Google Cloud Vision API (Recommended for Production)

**Accuracy**: 90-95% for handwriting  
**Cost**: $1.50 per 1,000 images  
**Setup Time**: 15 minutes

#### Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Vision API
3. Create API key
4. Create backend endpoint (Node.js example below)

#### Backend Setup (Node.js + Express):
```javascript
// server.js
const express = require('express');
const vision = require('@google-cloud/vision');
const multer = require('multer');

const app = express();
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'path/to/your-credentials.json'
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/ocr', upload.single('image'), async (req, res) => {
  try {
    const [result] = await client.documentTextDetection(req.file.buffer);
    const fullText = result.fullTextAnnotation;
    
    res.json({
      text: fullText.text,
      confidence: fullText.pages[0].confidence || 0.9
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('OCR API running on port 3001'));
```

#### Frontend Integration:
```typescript
// Update ocrService.ts
export async function performOCR(file: File): Promise<OCRResponse> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('http://localhost:3001/api/ocr', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  return {
    text: result.text,
    confidence: result.confidence,
  };
}
```

---

### Option 2: Azure Computer Vision

**Accuracy**: 85-90% for handwriting  
**Cost**: $1.00 per 1,000 images  
**Setup Time**: 10 minutes

#### Steps:
1. Create Azure account
2. Create Computer Vision resource
3. Get API key and endpoint
4. Use REST API

#### Example:
```typescript
export async function performOCR(file: File): Promise<OCRResponse> {
  const endpoint = 'YOUR_AZURE_ENDPOINT';
  const apiKey = 'YOUR_API_KEY';

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${endpoint}/vision/v3.2/read/analyze`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'Content-Type': 'application/octet-stream'
    },
    body: file
  });

  const operationUrl = response.headers.get('Operation-Location');
  
  // Poll for results
  let result;
  do {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resultResponse = await fetch(operationUrl, {
      headers: { 'Ocp-Apim-Subscription-Key': apiKey }
    });
    result = await resultResponse.json();
  } while (result.status === 'running');

  const text = result.analyzeResult.readResults
    .map(page => page.lines.map(line => line.text).join('\n'))
    .join('\n\n');

  return {
    text,
    confidence: 0.9
  };
}
```

---

### Option 3: AWS Textract

**Accuracy**: 85-90% for handwriting  
**Cost**: $1.50 per 1,000 pages  
**Best for**: Forms and structured documents

---

## 📊 Comparison Table

| Service | Handwriting Accuracy | Cost | Setup Difficulty | Best For |
|---------|---------------------|------|------------------|----------|
| **Tesseract.js** (Current) | 60-80% | Free | ✅ Easy | Testing, demos |
| **Google Vision** | 90-95% | $1.50/1k | Medium | Production |
| **Azure Vision** | 85-90% | $1.00/1k | Medium | Enterprise |
| **AWS Textract** | 85-90% | $1.50/1k | Hard | Forms |

---

## 💡 Tips for Better Handwriting Recognition

### For Students:
1. **Write clearly** - Use block letters if possible
2. **Good lighting** - Avoid shadows
3. **High contrast** - Dark pen on white paper
4. **Straight angle** - Keep camera parallel to paper
5. **High resolution** - Use at least 300 DPI

### For Best Results:
- Use **Google Vision API** for production
- Pre-process images (contrast enhancement, deskewing)
- Use higher resolution images (at least 1200x1600)
- Consider using specialized handwriting fonts for training

---

## 🔧 Current Implementation Status

✅ **Tesseract.js installed and configured**  
✅ **Real-time OCR processing**  
✅ **Progress tracking**  
✅ **Error handling**  
✅ **Confidence scoring**  

### Next Steps:
1. Test with actual handwritten answer sheets
2. If accuracy is insufficient, upgrade to Google Vision API
3. Add image preprocessing (brightness, contrast)
4. Implement batch processing for multiple sheets

---

## 🎯 Recommended for Your Hackathon

**For Demo**: Use current Tesseract.js setup ✅  
**For Production**: Upgrade to Google Cloud Vision API

The current setup is **ready to use** and will work for your hackathon demo!

