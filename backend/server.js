import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { ocrRouter } from './routes/ocr.js';
import { evaluationRouter } from './routes/evaluation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Routes
app.use('/api/ocr', ocrRouter);
app.use('/api/evaluation', evaluationRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Paper Correction API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 OCR endpoint: http://localhost:${PORT}/api/ocr`);
  console.log(`🤖 Evaluation endpoint: http://localhost:${PORT}/api/evaluation`);
});

