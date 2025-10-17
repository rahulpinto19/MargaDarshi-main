import React from 'react';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  alt: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt }) => {
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <div className="bg-blue-100 p-4 border-b border-blue-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Image Preview</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Rotate"
          >
            <RotateCw className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-4 overflow-auto max-h-[600px] bg-gray-50 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreview;

