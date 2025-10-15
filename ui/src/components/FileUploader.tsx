import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = 'image/*,.pdf',
  multiple = true,
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles(files);
        onFileSelect(files);
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      onFileSelect(files);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
          dragActive
            ? 'border-purple-500 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-2xl scale-105 animate-glow'
            : 'border-purple-300/50 hover:border-purple-400 hover:bg-gradient-to-br hover:from-indigo-50/50 hover:via-purple-50/50 hover:to-pink-50/50 hover:shadow-xl'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="inline-block p-3 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-xl mb-3 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Click to upload</span> or drag and drop
          </p>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, PDF up to 10MB
          </p>
        </label>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Selected Files ({selectedFiles.length})
          </h3>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                  <Upload className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="flex-shrink-0 ml-3 p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-300"
                title="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;

