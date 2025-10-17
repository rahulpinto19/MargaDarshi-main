import React from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import { appStore } from '../store/AppStore';
import { ArrowRight } from 'lucide-react';

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileSelect = (selectedFiles: File[]) => {

    setFiles(selectedFiles);
  };

  const handleProceed = async () => {
    if (files.length === 0) return;
    // Add files to store

    files.forEach((file) => {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const preview = URL.createObjectURL(file);
      appStore.addUploadedFile({ id, file, preview });

    });

    // Navigate through the flow automatically
    navigate('/ocr-preview');
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="mb-6 text-center relative">
        <div className="inline-flex items-center justify-center mb-3">
          <div className="p-3 bg-blue-600 rounded-2xl mr-4 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-blue-700 drop-shadow-lg leading-tight pb-2">
            Upload Answer Sheets
          </h1>
        </div>
        <p className="text-lg font-semibold drop-shadow text-blue-700">
          Upload scanned answer sheets or images to begin the evaluation process.
        </p>
      </div>

      <div className="glass-effect rounded-2xl p-6 animate-glow">
        <FileUploader onFileSelect={handleFileSelect} />

        {files.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleProceed}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold hover:bg-blue-700"
            >
              Proceed to OCR
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Feature 1 - OCR */}
        <div className="relative overflow-hidden bg-blue-50 border border-blue-300/50 rounded-xl p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-blue-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-3">
            <div className="flex-shrink-0 p-2 bg-blue-600 rounded-lg shadow-lg">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700">
                Smart OCR
              </h3>
              <p className="text-gray-700 text-xs mt-0.5 font-medium">
                Advanced text extraction
              </p>
            </div>
          </div>
        </div>

        {/* Feature 2 - AI Evaluation */}
        <div className="relative overflow-hidden bg-blue-50 border border-blue-300/50 rounded-xl p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-blue-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-3">
            <div className="flex-shrink-0 p-2 bg-blue-600 rounded-lg shadow-lg">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700">
                Gemini AI Powered
              </h3>
              <p className="text-gray-700 text-xs mt-0.5 font-medium">
                Intelligent evaluation
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3 - Custom Rubrics */}
        <div className="relative overflow-hidden bg-blue-50 border border-blue-300/50 rounded-xl p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-blue-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-3">
            <div className="flex-shrink-0 p-2 bg-blue-600 rounded-lg shadow-lg">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-700">
                Custom Rubrics
              </h3>
              <p className="text-gray-700 text-xs mt-0.5 font-medium">
                Flexible criteria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;

