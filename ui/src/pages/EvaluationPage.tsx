import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import RubricForm from '../components/RubricForm';
import { appStore, Rubric } from '../store/AppStore';
import { evaluateWithGemini } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

const EvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const { rubric, ocrResults, currentFileId } = useStore();
  const [evaluating, setEvaluating] = React.useState(false);

  const currentOCR = ocrResults.find((r) => r.fileId === currentFileId);

  const handleSaveRubric = (newRubric: Rubric) => {
    appStore.setRubric(newRubric);
  };

  const handleEvaluate = async () => {
    if (!currentOCR || !rubric || !currentFileId) return;

    setEvaluating(true);
    try {
      const evaluation = await evaluateWithGemini(currentOCR.text, rubric);
      appStore.addEvaluation({
        ...evaluation,
        id: Date.now().toString(),
        fileId: currentFileId,
        rubricId: 'default',
        timestamp: new Date(),
      });
      navigate('/results');
    } catch (error) {
      console.error('Evaluation failed:', error);
    } finally {
      setEvaluating(false);
    }
  };

  if (!currentOCR) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">No OCR text available. Please complete OCR first.</p>
        <button
          onClick={() => navigate('/ocr-preview')}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
        >
          Go to OCR Preview
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Decorative Sparkle Icons */}
      <div className="absolute -top-5 left-10 text-white/10 pointer-events-none animate-float">
        <Sparkles className="w-24 h-24" />
      </div>
      
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center mb-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mr-4 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg leading-tight pb-2">
            Evaluation Setup
          </h1>
        </div>
        <p className="text-lg font-semibold drop-shadow bg-gradient-to-r from-purple-700 via-fuchsia-700 to-pink-700 bg-clip-text text-transparent">
          Configure the evaluation rubric and let Gemini AI evaluate the answer sheet.
        </p>
      </div>

      <RubricForm rubric={rubric} onSave={handleSaveRubric} />

      {rubric && (
        <div className="mt-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl shadow-xl border-2 border-purple-200/50 p-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            ✨ Ready to Evaluate
          </h3>
          <p className="text-gray-700 mb-6 text-lg">
            The rubric is configured with <span className="font-bold text-purple-600">{rubric.criteria.length} criteria</span> and a total of{' '}
            <span className="font-bold text-pink-600">{rubric.totalMarks} marks</span>. Click below to start AI evaluation.
          </p>
          <button
            onClick={handleEvaluate}
            disabled={evaluating}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {evaluating ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                Evaluating with Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6" />
                Evaluate with Gemini AI
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default EvaluationPage;

