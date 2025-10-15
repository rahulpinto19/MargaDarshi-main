# MargaDarshi - Project Structure

## 📁 Clean Repository Structure

```
MargaDarshi/
│
├── 📄 README.md                    # Main project documentation
├── 📄 ARCHITECTURE.md              # System architecture and design
├── 📄 PROJECT_STRUCTURE.md         # This file
├── 📄 .gitignore                   # Root gitignore
│
├── 🎨 ui/                          # Frontend Application (React + TypeScript)
│   ├── public/                     # Static assets (if any)
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── Layout.tsx         # Main layout with navbar
│   │   │   ├── FileUploader.tsx   # Drag-drop file upload
│   │   │   ├── ImagePreview.tsx   # Zoomable image viewer
│   │   │   ├── OCRTextViewer.tsx  # Text display with copy/download
│   │   │   ├── RubricForm.tsx     # Dynamic rubric builder
│   │   │   ├── EvaluationPanel.tsx # Results display
│   │   │   └── FloatingIcons.tsx  # Background decorative icons
│   │   │
│   │   ├── pages/                 # Route pages
│   │   │   ├── LandingPage.tsx    # Home page with features
│   │   │   ├── LoginPage.tsx      # Authentication page
│   │   │   ├── UploadPage.tsx     # File upload interface
│   │   │   ├── OCRPreviewPage.tsx # OCR results preview
│   │   │   ├── EvaluationPage.tsx # Rubric setup & evaluation
│   │   │   └── ResultsPage.tsx    # Evaluation results
│   │   │
│   │   ├── services/              # API and business logic
│   │   │   ├── ocrService.ts      # Tesseract.js OCR integration
│   │   │   └── geminiService.ts   # Gemini AI mock service
│   │   │
│   │   ├── store/                 # State management
│   │   │   └── AppStore.ts        # Global state store
│   │   │
│   │   ├── hooks/                 # Custom React hooks
│   │   │   └── useStore.ts        # Store subscription hook
│   │   │
│   │   ├── utils/                 # Utility functions
│   │   │   └── imagePreprocessor.ts # Image enhancement utilities
│   │   │
│   │   ├── App.tsx                # Main app component with routing
│   │   ├── main.tsx               # React entry point
│   │   ├── index.css              # Global styles + Tailwind
│   │   └── vite-env.d.ts          # TypeScript declarations
│   │
│   ├── index.html                 # HTML entry point
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.ts             # Vite configuration
│   ├── tsconfig.json              # TypeScript configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── postcss.config.js          # PostCSS configuration
│   ├── .gitignore                 # Frontend gitignore
│   ├── OCR_SETUP_GUIDE.md         # OCR integration guide
│   └── TESTING_GUIDE.md           # Testing instructions
│
└── 🔧 backend/                     # Backend API (Node.js + Express)
    ├── routes/                    # API route handlers
    │   ├── ocr.js                 # OCR endpoints
    │   └── evaluation.js          # Evaluation endpoints
    │
    ├── services/                  # Business logic
    │   ├── ocrService.js          # OCR processing (Google Vision)
    │   └── geminiService.js       # Gemini AI integration
    │
    ├── server.js                  # Express server entry point
    ├── package.json               # Backend dependencies
    ├── .env.example               # Environment variables template
    ├── .gitignore                 # Backend gitignore
    └── README.md                  # Backend documentation
```

## 🎯 Purpose of Each Directory

### **Frontend (ui/)**
- **Standalone capable**: Works without backend using Tesseract.js
- **Technology**: React 18 + TypeScript + Vite + Tailwind CSS
- **Port**: 5173 (development)
- **Build output**: `ui/dist/`

### **Backend (backend/)**
- **Optional**: Only needed for production with real APIs
- **Technology**: Node.js + Express
- **Port**: 3001
- **Purpose**: Handle OCR and AI evaluation with real APIs

## 📦 Dependencies

### Frontend (ui/package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "lucide-react": "^0.344.0",
    "tesseract.js": "^6.0.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.4",
    "tailwindcss": "^3.4.1"
  }
}
```

### Backend (backend/package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1",
    "dotenv": "^16.3.1",
    "@google-cloud/vision": "^4.0.2",
    "@google/generative-ai": "^0.1.3"
  }
}
```

## 🗑️ Files Removed

✅ **Removed from root:**
- `index.html` (duplicate - belongs in ui/)
- `package.json` (duplicate - each folder has its own)
- `package-lock.json` (duplicate)
- `node_modules/` (unnecessary at root)

## ✅ Clean Structure Benefits

1. **Clear Separation**: Frontend and backend are completely independent
2. **Independent Deployment**: Deploy frontend and backend separately
3. **No Conflicts**: Each has its own dependencies
4. **Scalable**: Easy to add more services or frontends
5. **Professional**: Industry-standard monorepo structure

## 🚀 How to Run

### Development (Frontend Only)
```bash
cd ui
npm run dev
# Runs on http://localhost:5173
```

### Development (Full Stack)
```bash
# Terminal 1 - Frontend
cd ui
npm run dev

# Terminal 2 - Backend
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

## 📝 Documentation Files

| File | Purpose | Location |
|------|---------|----------|
| `README.md` | Main project overview | Root |
| `ARCHITECTURE.md` | System design | Root |
| `PROJECT_STRUCTURE.md` | This file | Root |
| `ui/README.md` | Frontend setup | ui/ |
| `ui/OCR_SETUP_GUIDE.md` | OCR integration | ui/ |
| `ui/TESTING_GUIDE.md` | Testing guide | ui/ |
| `backend/README.md` | Backend API docs | backend/ |

## 🎯 Current Status

✅ **Frontend**: Fully functional standalone app  
✅ **Backend**: Ready for production API integration  
✅ **Structure**: Clean and professional  
✅ **Documentation**: Comprehensive guides  
✅ **Ready**: For hackathon presentation!

