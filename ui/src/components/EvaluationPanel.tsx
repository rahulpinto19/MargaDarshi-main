import React from 'react';
import { Loader2 } from 'lucide-react';
import { EvaluationResult } from '../store/AppStore';

interface EvaluationPanelProps {
  evaluation: EvaluationResult | null;
  loading?: boolean;
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ evaluation, loading }) => {
  if (loading) {
    return (
      <div className="glass-effect rounded-2xl p-12 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <Loader2 className="relative h-20 w-20 text-purple-600 animate-spin" />
        </div>
        <p className="mt-8 text-gray-700 font-semibold text-lg">Evaluating with Gemini AI...</p>
        <p className="mt-2 text-gray-500 text-sm">This may take a few moments</p>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        No evaluation results yet. Start an evaluation to see results here.
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-2">🎉 Evaluation Results</h2>
        <p className="text-green-100 text-sm">
          Evaluated on {new Date(evaluation.timestamp).toLocaleString()}
        </p>
      </div>

      <div className="p-8">
        <div className="mb-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 border-2 border-teal-300 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-700">Total Score</span>
            <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {evaluation.totalScore}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Detailed Scores
          </h3>
          {evaluation.scores.map((score, index) => (
            <div key={score.criterionId} className="border-2 border-teal-200/50 bg-gradient-to-br from-white to-teal-50/30 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 text-lg">Criterion {score.criterionId}</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {score.score}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{score.feedback}</p>
            </div>
          ))}
        </div>

        {evaluation.overallFeedback && (
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              💬 Overall Feedback
            </h3>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{evaluation.overallFeedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationPanel;

