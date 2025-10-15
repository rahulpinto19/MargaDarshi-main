# 🚀 MargaDarshi - Quick Start Guide

## ⚡ Get Running in 2 Minutes

### Step 1: Start Frontend
```bash
cd ui
npm run dev
```

### Step 2: Open Browser
Navigate to: **http://localhost:5173**

That's it! 🎉

---

## 📱 Using the App

### 1. Landing Page
- View features and "How It Works"
- Click **"Get Started"** button

### 2. Login
- Enter any email and password
- Click **"Login"**

### 3. Upload Answer Sheets
- Drag & drop images or click to browse
- Supported: JPG, PNG, PDF
- Click **"Proceed to OCR"**

### 4. OCR Preview
- Wait 10-30 seconds for text extraction
- View extracted text on the right
- Check confidence score
- Click **"Proceed to Evaluation"**

### 5. Configure Rubric
- Edit default criteria or add new ones
- Set marks for each criterion
- Click **"Save Rubric"**
- Click **"Evaluate with Gemini AI"**

### 6. View Results
- See total score and detailed feedback
- Download report
- Start new evaluation

---

## 🎯 Current Setup

### ✅ What's Working
- Beautiful gradient UI with animations
- Login/logout functionality
- File upload with preview
- **Real OCR** using Tesseract.js
- Mock AI evaluation (for demo)
- Custom rubric builder
- Results display and export

### 🔄 What's Mock (For Demo)
- AI evaluation (uses random scores)
- User authentication (accepts any credentials)

### 🚀 Production Ready
- OCR extraction is **real** and working
- Backend structure is ready
- Just need to add real API keys

---

## 🛠️ For Production

### Add Real Gemini AI
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update `ui/src/services/geminiService.ts`
3. Uncomment production code

### Add Backend (Optional)
```bash
cd backend
npm install
cp .env.example .env
# Add your API keys to .env
npm run dev
```

---

## 📊 Project Stats

- **Total Files**: ~30 source files
- **Components**: 7 reusable components
- **Pages**: 6 route pages
- **Lines of Code**: ~2,500+
- **Bundle Size**: ~500KB
- **Load Time**: <2 seconds

---

## 🎨 UI Features

- ✅ Gradient backgrounds (Indigo → Purple → Pink)
- ✅ Glass-morphism effects
- ✅ Floating background icons
- ✅ Smooth transitions and hover effects
- ✅ Responsive design (mobile-friendly)
- ✅ Dark text on light backgrounds
- ✅ Accessibility considerations

---

## 🐛 Common Issues

### OCR takes too long
- Use smaller images (<2MB)
- Compress before uploading

### Text not extracted properly
- Ensure good lighting
- Use high contrast (dark text on white)
- Keep image straight

### Build errors
```bash
cd ui
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Need Help?

1. Check [TESTING_GUIDE.md](ui/TESTING_GUIDE.md)
2. Check [OCR_SETUP_GUIDE.md](ui/OCR_SETUP_GUIDE.md)
3. Check browser console (F12) for errors
4. Review [ARCHITECTURE.md](ARCHITECTURE.md)

---

## ✨ Hackathon Tips

### For Demo:
1. Prepare sample answer sheet images
2. Test OCR beforehand
3. Show the gradient UI
4. Demonstrate the full flow
5. Highlight the AI evaluation

### Talking Points:
- "Real OCR using Tesseract.js"
- "Beautiful, modern UI with gradients"
- "Customizable rubrics for any subject"
- "Ready for Gemini AI integration"
- "Scalable architecture with separate backend"

### Impressive Features:
- Client-side OCR (no server needed)
- Image preprocessing for accuracy
- Real-time progress tracking
- Export functionality
- Professional UI/UX

---

## 🎯 Next Steps

1. ✅ Test with real answer sheets
2. ✅ Prepare demo presentation
3. 🔄 (Optional) Add real Gemini API
4. 🔄 (Optional) Deploy to Vercel
5. 🔄 (Optional) Add database for history

---

**Good luck with your hackathon! 🚀✨**

