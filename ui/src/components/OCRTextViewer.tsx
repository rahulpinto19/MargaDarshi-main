import React from 'react';
import { Copy, Download } from 'lucide-react';

interface OCRTextViewerProps {
  text: string;
  confidence?: number;
}

const OCRTextViewer: React.FC<OCRTextViewerProps> = ({ text, confidence }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ocr-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 p-4 border-b border-teal-200/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-sm font-medium text-gray-700">Extracted Text</h3>
          {confidence !== undefined && (
            <span className="text-xs text-gray-500">
              Confidence: {(confidence * 100).toFixed(1)}%
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Download as text file"
          >
            <Download className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-4 max-h-[600px] overflow-auto">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
          {text || 'No text extracted yet...'}
        </pre>
      </div>
      {copied && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-md shadow-lg text-sm">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default OCRTextViewer;

