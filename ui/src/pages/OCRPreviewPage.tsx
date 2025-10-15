import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import ImagePreview from '../components/ImagePreview';
import OCRTextViewer from '../components/OCRTextViewer';
import { appStore } from '../store/AppStore';
import { performOCR } from '../services/ocrService';
import { ArrowRight, Loader2 } from 'lucide-react';
import { textDetection } from './textDetection' 


const OCRPreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { uploadedFiles, ocrResults, currentFileId } = useStore();
  const [processing, setProcessing] = React.useState(false);

  const currentFile = uploadedFiles.find((f) => f.id === currentFileId);
  const currentOCR = ocrResults.find((r) => r.fileId === currentFileId);

  React.useEffect(() => {
    if (currentFile && !currentOCR && !processing) {
      handleOCR();
    }
  }, [currentFile, currentOCR]);

  const handleOCR = async () => {
    if (!currentFile) return;

    setProcessing(true);
    
    try {
      // const result = await performOCR(currentFile.file);
      const getConfidence = await performOCR(currentFile.file);
      const result = await textDetection(currentFile.file);
      appStore.setOCRResult({
        fileId: currentFile.id,
        text: result.text,
        confidence: getConfidence.confidence,
      });
    } catch (error) {
      console.error('OCR failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleProceed = () => {
    navigate('/evaluation');
  };

  if (!currentFile) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">No files uploaded. Please upload files first.</p>
        <button
          onClick={() => navigate('/upload')}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Decorative Icon */}
      <div className="absolute -top-5 right-10 text-white/10 pointer-events-none animate-float">
        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
        </svg>
      </div>
      
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center mb-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mr-4 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg leading-tight pb-2">
            OCR Preview
          </h1>
        </div>
        <p className="text-lg font-semibold drop-shadow bg-gradient-to-r from-green-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
          Review the extracted text from the uploaded answer sheet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ImagePreview src={currentFile.preview} alt={currentFile.file.name} />

        {processing ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Loader2 className="relative h-16 w-16 text-purple-600 animate-spin" />
            </div>
            <p className="text-gray-800 font-semibold text-lg mb-2">Processing OCR...</p>
            <p className="text-gray-600 text-sm text-center max-w-md">
              Extracting text from your image. This may take 10-30 seconds depending on image size and complexity.
            </p>
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
              <p className="text-xs text-blue-800 text-center">
                💡 <strong>Tip:</strong> Open browser console (F12) to see detailed progress
              </p>
            </div>
          </div>
        ) : (
          <OCRTextViewer text={currentOCR?.text || ''} confidence={currentOCR?.confidence} />
        )}
      </div>

      {currentOCR && !processing && (
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleOCR}
            className="px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 font-medium"
          >
            Re-process OCR
          </button>
          <button
            onClick={handleProceed}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
          >
            Proceed to Evaluation
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OCRPreviewPage;

