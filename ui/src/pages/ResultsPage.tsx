import React from 'react';
import { useNavigate } from 'react-router-dom';
import EvaluationPanel from '../components/EvaluationPanel';
import { Download, Home } from 'lucide-react';
import { appStore } from '../store/AppStore';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { evaluations, currentFileId } = appStore.getState();

  const currentEvaluation = evaluations.find((e) => e.fileId === currentFileId);

  const handleDownloadReport = () => {
    if (!currentEvaluation) return;

    const report = `
EVALUATION REPORT
=================

Date: ${new Date(currentEvaluation.timestamp).toLocaleString()}
Total Score: ${currentEvaluation.overallScore}

DETAILED SCORES
---------------
${currentEvaluation.categories
  .map(
    (s) => `
Criterion ${s.id}: ${s.score}
Feedback: ${s.description}
`
  )
  .join('\n')}

OVERALL FEEDBACK
----------------
${currentEvaluation.overallFeedback}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation-report-${currentEvaluation.fileId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Decorative Trophy Icon */}
      <div className="absolute -top-5 right-10 text-white/10 pointer-events-none animate-float">
        <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"/>
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
        </svg>
      </div>
      
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center mb-3">
          <div className="p-3 bg-blue-600 rounded-2xl mr-4 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-blue-700 drop-shadow-lg leading-tight pb-2">
            Evaluation Results
          </h1>
        </div>
        <p className="text-lg font-semibold drop-shadow text-blue-700">
          Review the AI-generated evaluation and feedback for the answer sheet.
        </p>
      </div>

      <EvaluationPanel evaluation={currentEvaluation || null} />

      {currentEvaluation && (
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center px-6 py-3 border-2 border-blue-300 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium"
          >
            <Home className="mr-2 h-5 w-5" />
            Start New Evaluation
          </button>
          <button
            onClick={handleDownloadReport}
            className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold hover:bg-blue-700"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;

