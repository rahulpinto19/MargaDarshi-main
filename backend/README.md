# Paper Correction Backend API

Backend server for the Paper Correction System with OCR and Gemini AI evaluation.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```
GET /health
```

### OCR Processing
```
POST /api/ocr
Content-Type: multipart/form-data

Body:
- image: File (JPG, PNG, PDF)

Response:
{
  "text": "Extracted text...",
  "confidence": 0.92,
  "success": true
}
```

### AI Evaluation
```
POST /api/evaluation
Content-Type: application/json

Body:
{
  "text": "Answer text to evaluate",
  "rubric": {
    "criteria": [
      {
        "id": "1",
        "name": "Content Quality",
        "maxMarks": 10,
        "description": "Quality of content"
      }
    ],
    "totalMarks": 10
  }
}

Response:
{
  "scores": [
    {
      "criterionId": "1",
      "score": 8,
      "feedback": "Excellent work..."
    }
  ],
  "totalScore": 8,
  "overallFeedback": "Overall assessment...",
  "success": true
}
```

## 🔧 Configuration

### Google Cloud Vision API (OCR)
1. Create a Google Cloud project
2. Enable Vision API
3. Download credentials JSON
4. Place in `backend/credentials/google-cloud-key.json`
5. Uncomment code in `services/ocrService.js`

### Google Gemini API (Evaluation)
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env` file: `GEMINI_API_KEY=your_key`
3. Uncomment code in `services/geminiService.js`

## 📁 Project Structure

```
backend/
├── server.js              # Main server file
├── routes/
│   ├── ocr.js            # OCR endpoints
│   └── evaluation.js     # Evaluation endpoints
├── services/
│   ├── ocrService.js     # OCR processing logic
│   └── geminiService.js  # Gemini AI logic
├── package.json
├── .env.example
└── README.md
```

## 🧪 Testing

### Test OCR Endpoint
```bash
curl -X POST http://localhost:3001/api/ocr \
  -F "image=@path/to/image.jpg"
```

### Test Evaluation Endpoint
```bash
curl -X POST http://localhost:3001/api/evaluation \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Sample answer text",
    "rubric": {
      "criteria": [{"id": "1", "name": "Test", "maxMarks": 10, "description": "Test criterion"}],
      "totalMarks": 10
    }
  }'
```

## 🔒 Security Notes

- Never commit `.env` file or API keys
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add authentication/authorization as needed

## 📦 Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **multer**: File upload handling
- **dotenv**: Environment variables
- **@google-cloud/vision**: Google Vision API
- **@google/generative-ai**: Gemini AI API

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku config:set GEMINI_API_KEY=your_key
```

### Deploy to Railway
```bash
railway init
railway up
```

## 📝 Notes

- Currently using mock services for development
- Uncomment real API code when credentials are ready
- Frontend expects backend at `http://localhost:3001`

