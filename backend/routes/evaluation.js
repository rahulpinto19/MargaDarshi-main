import express from 'express';


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



   textEvaluation(rubric,text)
      
.then((result) => {

            res.json({ res: result }); 
        })
  } catch (error) {
    console``.error('Evaluation Error:', error);
    res.status(500).json({ 
      error: 'Evaluation failed',
      message: error.message 
    });
  }
});

export default evaluationRouter;

