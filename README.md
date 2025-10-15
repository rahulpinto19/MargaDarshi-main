# MargaDarshi
## Paper Correction System

A modern full-stack web application for automated paper correction using OCR and Gemini AI evaluation.

**MargaDarshi** (मार्गदर्शी) means "Guide" or "Mentor" in Sanskrit - helping educators guide students through intelligent evaluation.

## 🚀 Features

- **File Upload**: Drag-and-drop interface for uploading answer sheets (images/PDFs)
- **OCR Processing**: Automatic text extraction from scanned documents using Tesseract.js / Google Vision API
- **AI Evaluation**: Gemini AI-powered evaluation based on custom rubrics
- **Rubric Management**: Create and customize evaluation criteria
- **Results Dashboard**: View detailed scores and feedback
- **RESTful API**: Separate backend for scalability

## 📁 Project Structure

```
MargaDarshi/
├── ui/                          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Route pages
│   │   ├── services/           # API services (client-side)
│   │   ├── store/              # State management
│   │   └── hooks/              # Custom React hooks
│   ├── package.json
│   └── README.md
│
└── backend/                     # Node.js + Express API server
    ├── src/
    │   ├── components/          # Reusable UI components
    │   │   ├── Layout.tsx
    │   │   ├── FileUploader.tsx
    │   │   ├── ImagePreview.tsx
    │   │   ├── OCRTextViewer.tsx
    │   │   ├── RubricForm.tsx
    │   │   └── EvaluationPanel.tsx
    │   ├── pages/               # Route pages
    │   │   ├── UploadPage.tsx
    │   │   ├── OCRPreviewPage.tsx
    │   │   ├── EvaluationPage.tsx
    │   │   ├── ResultsPage.tsx
    │   │   └── HistoryPage.tsx
    │   ├── services/            # API services
    │   │   ├── ocrService.ts
    │   │   └── geminiService.ts
    │   ├── store/               # State management
    │   │   └── AppStore.ts
    │   ├── hooks/               # Custom React hooks
    │   │   └── useStore.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: Custom lightweight store
- **OCR**: Mock service (ready for Tesseract.js or Google Vision API)
- **AI Evaluation**: Mock service (ready for Google Gemini API)

## 📦 Installation & Setup

### Prerequisites

- Node.js 16+ and npm

### Frontend Setup

1. **Navigate to the UI directory**:
   ```bash
   cd ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

### Backend Setup (Optional - for production)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

5. **Backend runs on**:
   `http://localhost:3001`

### Running Both (Full Stack)

```bash
# Terminal 1 - Frontend
cd ui && npm run dev

# Terminal 2 - Backend
cd backend && npm run dev
```

## 🎯 Usage

### Frontend (Standalone Mode)
The frontend works standalone with client-side OCR (Tesseract.js) and mock AI evaluation:

1. **Login**: Use any email/password to access the system
2. **Upload**: Upload answer sheet images or PDFs
3. **OCR Preview**: Review extracted text from the documents
4. **Evaluation**: Configure rubric and run AI evaluation
5. **Results**: View detailed scores and feedback

### Full Stack Mode
For production with real APIs:

1. Configure backend with Google Cloud Vision and Gemini API keys
2. Update frontend API endpoints to point to backend
3. Backend handles OCR and AI evaluation
4. Frontend displays results

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `ui` directory for production API keys:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OCR_API_KEY=your_ocr_api_key_here
```

### Integrating Real APIs

#### OCR Integration (Tesseract.js example)

```bash
npm install tesseract.js
```

Uncomment the production code in `src/services/ocrService.ts`

#### Gemini AI Integration

```bash
npm install @google/generative-ai
```

Uncomment the production code in `src/services/geminiService.ts`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

### Core Components

- **FileUploader**: Drag-and-drop file upload with preview
- **ImagePreview**: Zoomable and rotatable image viewer
- **OCRTextViewer**: Text display with copy and download
- **RubricForm**: Dynamic rubric creation and editing
- **EvaluationPanel**: Results display with detailed feedback

### Pages

- **UploadPage**: File upload interface
- **OCRPreviewPage**: Side-by-side image and text view
- **EvaluationPage**: Rubric configuration and evaluation trigger
- **ResultsPage**: Detailed evaluation results
- **HistoryPage**: Grid view of past evaluations

## 🚀 Deployment

### Build for production

```bash
cd ui
npm run build
```

The `dist` folder will contain the production-ready files.

### Deploy to Vercel/Netlify

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

## 🤝 Contributing

This is a hackathon project. Feel free to fork and extend!

## 🏗️ Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed system architecture and data flow diagrams.

### Quick Overview
- **Frontend**: React + TypeScript (Standalone capable)
- **Backend**: Node.js + Express (Optional for production)
- **OCR**: Tesseract.js (client) or Google Vision API (server)
- **AI**: Mock (development) or Gemini API (production)

## 📄 License

MIT License

## 👥 Team

Developed for the hackathon - Paper Correction System with Gemini AI integration.

## 🔗 Related Documentation

- [Frontend README](ui/README.md) - UI setup and configuration
- [Backend README](backend/README.md) - API documentation
- [Architecture](ARCHITECTURE.md) - System design and data flow
- [OCR Setup Guide](ui/OCR_SETUP_GUIDE.md) - OCR integration options
