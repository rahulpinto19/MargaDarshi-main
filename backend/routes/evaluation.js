import express from 'express';
import { evaluateWithGemini } from '../services/geminiService.js';

export const evaluationRouter = express.Router();

// POST /api/evaluation - Evaluate answer using Gemini AI
import textEvaluation from '../services/textEvaluation.js'

evaluationRouter.post('/', async (req, res) => {
  try {
    const { text, rubric } = req.body;

    if (!text || !rubric) {
      return res.status(400).json({ 
        error: 'Missing required fields: text and rubric' 
      });
    }

    console.log(rubric,"rubric is")
    
    const result = await textEvaluation(text);
    
    res.json({
      ...result,
      success: true
    });
  } catch (error) {
    console.error('Evaluation Error:', error);
    res.status(500).json({ 
      error: 'Evaluation failed',
      message: error.message 
    });
  }
});

export default evaluationRouter;

