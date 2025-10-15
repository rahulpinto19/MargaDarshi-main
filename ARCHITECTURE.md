# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           React Frontend (Port 5173)               │    │
│  │                                                     │    │
│  │  • Login Page                                      │    │
│  │  • Upload Interface                                │    │
│  │  • OCR Preview                                     │    │
│  │  • Evaluation Setup                                │    │
│  │  • Results Display                                 │    │
│  │                                                     │    │
│  │  Client-side OCR: Tesseract.js                    │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                  │
│                           │ HTTP/REST API                    │
│                           ▼                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Backend Server (Port 3001)                │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Express.js API Server                  │    │
│  │                                                     │    │
│  │  Routes:                                           │    │
│  │  • POST /api/ocr         - Process images         │    │
│  │  • POST /api/evaluation  - Evaluate answers       │    │
│  │  • GET  /health          - Health check           │    │
│  │                                                     │    │
│  │  Services:                                         │    │
│  │  • OCR Service (Google Vision API)                │    │
│  │  • Gemini Service (Google Generative AI)          │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                  │
│                           │ External APIs                    │
│                           ▼                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      External Services                       │
│                                                              │
│  ┌──────────────────────┐    ┌─────────────────────────┐  │
│  │  Google Cloud Vision │    │  Google Gemini AI       │  │
│  │  (OCR Processing)    │    │  (Answer Evaluation)    │  │
│  └──────────────────────┘    └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Upload & OCR Flow
```
User uploads image
    ↓
Frontend: Display preview
    ↓
Option A (Client-side):
    → Tesseract.js processes image
    → Extract text locally
    → Display in OCR Preview
    
Option B (Server-side):
    → Send image to /api/ocr
    → Backend: Google Vision API
    → Return extracted text
    → Display in OCR Preview
```

### 2. Evaluation Flow
```
User configures rubric
    ↓
User clicks "Evaluate"
    ↓
Option A (Mock - Development):
    → Frontend: Generate random scores
    → Display results immediately
    
Option B (Real - Production):
    → Send text + rubric to /api/evaluation
    → Backend: Call Gemini API
    → AI evaluates based on rubric
    → Return scores + feedback
    → Display results
```

## Technology Stack

### Frontend (ui/)
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State**: Custom lightweight store
- **OCR**: Tesseract.js (client-side)

### Backend (backend/)
- **Runtime**: Node.js
- **Framework**: Express.js
- **File Upload**: Multer
- **OCR**: Google Cloud Vision API
- **AI**: Google Generative AI (Gemini)
- **Environment**: dotenv

## Deployment Options

### Option 1: Standalone Frontend (Demo/Hackathon)
```
Deploy: Vercel / Netlify
Features: Client-side OCR, Mock evaluation
Cost: Free
Setup: 5 minutes
```

### Option 2: Full Stack (Production)
```
Frontend: Vercel / Netlify
Backend: Railway / Heroku / AWS
Features: Real OCR, Real AI evaluation
Cost: ~$10-50/month
Setup: 30 minutes
```

## API Integration Modes

### Development Mode (Current)
- Frontend: Standalone with Tesseract.js
- Backend: Not required
- APIs: Mock services
- Perfect for: Demos, testing, hackathons

### Production Mode
- Frontend: Calls backend APIs
- Backend: Handles OCR and AI
- APIs: Google Cloud Vision + Gemini
- Perfect for: Real deployment

## Security Considerations

1. **API Keys**: Store in backend `.env`, never in frontend
2. **File Upload**: 10MB limit, validate file types
3. **CORS**: Configure allowed origins
4. **Rate Limiting**: Implement on backend
5. **Authentication**: Add JWT tokens for production

## Scalability

### Current Capacity
- Frontend: Unlimited (static hosting)
- Backend: ~100 concurrent requests
- OCR: Limited by API quotas
- AI: Limited by API quotas

### Scaling Strategy
1. Add Redis for caching OCR results
2. Implement queue system (Bull/RabbitMQ)
3. Use CDN for static assets
4. Add load balancer for backend
5. Implement database for history

## Future Enhancements

1. **Database Integration**
   - PostgreSQL for storing evaluations
   - MongoDB for document storage

2. **Real-time Features**
   - WebSocket for live OCR progress
   - Real-time collaboration

3. **Advanced Features**
   - Batch processing
   - PDF generation for reports
   - Email notifications
   - Analytics dashboard

4. **Mobile App**
   - React Native version
   - Camera integration
   - Offline OCR

