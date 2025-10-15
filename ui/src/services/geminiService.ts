// Mock Gemini AI Service - Replace with actual Gemini API integration

import { Rubric } from '../store/AppStore';

export interface EvaluationResponse {
  scores: { criterionId: string; score: number; feedback: string }[];
  totalScore: number;
  overallFeedback: string;
}

export async function evaluateWithGemini(
  answerText: string,
  rubric: Rubric
): Promise<EvaluationResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Mock evaluation - In production, call actual Gemini API
  const scores = rubric.criteria.map((criterion) => {
    const randomScore = Math.floor(Math.random() * (criterion.maxMarks + 1));
    const feedbacks = [
      'Excellent understanding demonstrated with clear explanations.',
      'Good effort, but could include more details.',
      'Satisfactory answer with room for improvement.',
      'Needs more depth and clarity in the response.',
      'Outstanding work with comprehensive coverage.',
    ];
    
    return {
      criterionId: criterion.id,
      score: randomScore,
      feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)],
    };
  });

  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);

  const overallFeedback = `The student has demonstrated a ${
    totalScore / rubric.totalMarks > 0.8 ? 'strong' : totalScore / rubric.totalMarks > 0.6 ? 'good' : 'satisfactory'
  } understanding of the subject matter. The answers show ${
    totalScore / rubric.totalMarks > 0.7 ? 'excellent' : 'adequate'
  } knowledge and reasoning skills. ${
    totalScore / rubric.totalMarks < 0.7
      ? 'Consider reviewing the topics and providing more detailed explanations in future assessments.'
      : 'Keep up the great work!'
  }`;

  return {
    scores,
    totalScore,
    overallFeedback,
  };
}

// For production, integrate with Google Gemini API:
/*
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

export async function evaluateWithGemini(
  answerText: string,
  rubric: Rubric
): Promise<EvaluationResponse> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
You are an expert evaluator. Evaluate the following answer based on the rubric provided.

RUBRIC:
${rubric.criteria.map((c) => `- ${c.name} (${c.maxMarks} marks): ${c.description}`).join('\n')}

ANSWER:
${answerText}

Provide a JSON response with:
1. scores: Array of {criterionId, score, feedback}
2. totalScore: Sum of all scores
3. overallFeedback: Overall assessment

Respond ONLY with valid JSON.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  return JSON.parse(text);
}
*/

