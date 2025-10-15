# MargaDarshi Frontend

React + TypeScript frontend for the Paper Correction System.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:5173
```

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Tesseract.js** - Client-side OCR
- **Lucide React** - Icons

## 🎨 Features

- ✅ Beautiful gradient UI with glass-morphism
- ✅ Responsive design (mobile-friendly)
- ✅ Client-side OCR (no backend required)
- ✅ Custom rubric builder
- ✅ Mock AI evaluation
- ✅ File upload with drag-drop
- ✅ Image preview with zoom/rotate
- ✅ Results export

## 📁 Structure

```
ui/src/
├── components/     # Reusable UI components
├── pages/          # Route pages
├── services/       # Business logic (OCR, AI)
├── store/          # State management
├── hooks/          # Custom hooks
└── utils/          # Helper functions
```

## 🔧 Configuration

### Environment Variables (Optional)
Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:3001
VITE_GEMINI_API_KEY=your_key_here
```

### Tailwind Colors
Customized in `tailwind.config.js`:
- Primary: Blue shades
- Gradients: Indigo → Purple → Pink

## 📝 Available Scripts

- `npm run dev` - Start dev server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧪 Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed testing instructions.

## 📚 Documentation

- [OCR Setup Guide](OCR_SETUP_GUIDE.md) - OCR integration options
- [Testing Guide](TESTING_GUIDE.md) - How to test features
- [Main README](../README.md) - Project overview

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder
```

## 🔗 Backend Integration

To connect to backend API:

1. Update `src/services/ocrService.ts`:
```typescript
export async function performOCR(file: File): Promise<OCRResponse> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('http://localhost:3001/api/ocr', {
    method: 'POST',
    body: formData,
  });

  return await response.json();
}
```

2. Update `src/services/geminiService.ts` similarly

## ⚡ Performance

- **Bundle size**: ~500KB (gzipped)
- **First load**: <2s
- **OCR processing**: 10-30s (depends on image)
- **Lighthouse score**: 90+

## 🐛 Troubleshooting

### Issue: OCR not working
- Check browser console for errors
- Ensure Tesseract.js is loaded
- Try smaller images (<5MB)

### Issue: Build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf dist .vite`

## 📄 License

MIT

