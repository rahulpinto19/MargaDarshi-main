# Testing Guide - OCR Functionality

## ✅ How to Test OCR Extraction

### Step 1: Start the Application
```bash
cd ui
npm run dev
```
Open `http://localhost:5173`

### Step 2: Login
- Enter any email and password
- Click "Login"

### Step 3: Upload an Image
1. Click "Upload Answer Sheets"
2. Drag and drop an image OR click to browse
3. Select an image with text (JPG, PNG)
4. Click "Proceed to OCR"

### Step 4: Monitor OCR Process
1. **Open Browser Console** (Press F12)
2. Go to "Console" tab
3. You should see:
   ```
   🔍 Starting OCR process...
   📄 File: test.jpg | Size: 234.56 KB
   ⚙️ Preprocessing image...
   🤖 Initializing Tesseract worker...
   Tesseract: {status: 'loading tesseract core', progress: 0}
   Tesseract: {status: 'initializing tesseract', progress: 0}
   Tesseract: {status: 'loading language traineddata', progress: 0}
   Tesseract: {status: 'recognizing text', progress: 0.25}
   📊 OCR Progress: 25%
   📊 OCR Progress: 50%
   📊 OCR Progress: 75%
   📊 OCR Progress: 100%
   📝 Extracting text from image...
   ✅ OCR completed successfully!
   📊 Confidence: 87.23%
   📝 Extracted text length: 456 characters
   📄 Extracted text: Question 1: What is...
   ```

### Step 5: View Results
- Left side: Original image (zoomable, rotatable)
- Right side: Extracted text with confidence score
- Options to copy or download text

## 🧪 Test Cases

### Test Case 1: Printed Text (Easy)
**Image**: Typed document, printed paper
**Expected**: 90-95% accuracy
**Time**: 10-15 seconds

### Test Case 2: Handwritten Text (Medium)
**Image**: Clear handwriting, dark pen
**Expected**: 60-80% accuracy
**Time**: 15-25 seconds

### Test Case 3: Mixed Content (Hard)
**Image**: Printed questions + handwritten answers
**Expected**: 70-85% accuracy
**Time**: 20-30 seconds

## 🐛 Troubleshooting

### Issue: "OCR processing failed"
**Causes:**
- Image file is corrupted
- Browser doesn't support canvas API
- Tesseract.js failed to load

**Solutions:**
1. Try a different image
2. Clear browser cache and reload
3. Check console for specific error messages
4. Try a different browser (Chrome recommended)

### Issue: "No text detected"
**Causes:**
- Image is too blurry
- Text is too small
- Poor contrast (light text on light background)
- Image is upside down or rotated

**Solutions:**
1. Use higher resolution images (at least 1200px width)
2. Ensure good lighting
3. Use dark text on white/light background
4. Rotate image if needed

### Issue: Low accuracy / garbled text
**Causes:**
- Handwriting is unclear
- Image quality is poor
- Shadows or glare on paper

**Solutions:**
1. Use clearer images
2. For handwriting: write in block letters
3. Increase image brightness/contrast before uploading
4. Consider using Google Vision API for better handwriting recognition

### Issue: OCR takes too long
**Causes:**
- Image file is very large (>5MB)
- High resolution image (>4000px)
- Browser is slow

**Solutions:**
1. Compress image before uploading
2. Resize image to 1200-2000px width
3. Close other browser tabs
4. Use a faster computer/browser

## 📊 Expected Performance

| Image Type | Accuracy | Processing Time |
|------------|----------|-----------------|
| Printed Text (Clear) | 90-95% | 10-15s |
| Printed Text (Scanned) | 85-90% | 15-20s |
| Handwritten (Clear) | 70-80% | 20-25s |
| Handwritten (Messy) | 50-70% | 25-30s |
| Mixed Content | 70-85% | 20-30s |

## 🎯 Best Practices for Students

### For Best OCR Results:
1. ✅ Use a scanner or high-quality camera
2. ✅ Ensure paper is flat (no wrinkles)
3. ✅ Good lighting (natural daylight is best)
4. ✅ Dark pen on white paper (high contrast)
5. ✅ Keep camera parallel to paper
6. ✅ Minimum 1200px width resolution
7. ✅ Save as JPG or PNG (not PDF for best results)

### For Handwriting:
1. ✅ Write clearly in block letters if possible
2. ✅ Leave space between lines
3. ✅ Use dark ink (black or blue)
4. ✅ Avoid cursive if possible
5. ✅ Write larger than normal

## 🔧 Advanced Testing

### Test with Console Commands
Open browser console and run:

```javascript
// Check if Tesseract is loaded
console.log('Tesseract available:', typeof Tesseract !== 'undefined');

// Manual OCR test
const testOCR = async () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    console.log('Testing OCR with:', file.name);
    // OCR will run automatically when you navigate to OCR preview
  };
  input.click();
};
testOCR();
```

## 📝 Sample Test Images

Create test images with:
1. **Simple text**: "Hello World" in large font
2. **Question format**: "Q1: What is 2+2? A: 4"
3. **Paragraph**: Multiple lines of text
4. **Handwritten**: Your own handwriting sample

## 🚀 Production Upgrade

For better accuracy in production:
1. Use Google Cloud Vision API (90-95% for handwriting)
2. Add image rotation detection
3. Implement batch processing
4. Add manual text correction interface
5. Store OCR results in database

## ✅ Verification Checklist

- [ ] Dev server running on port 5173
- [ ] Can login successfully
- [ ] Can upload image files
- [ ] See "Processing OCR..." message
- [ ] Console shows OCR progress logs
- [ ] Extracted text appears on right side
- [ ] Confidence score is displayed
- [ ] Can copy/download extracted text
- [ ] Can proceed to evaluation page

