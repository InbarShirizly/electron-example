import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Edit } from 'lucide-react';

export default function EditorView({ 
  project, 
  images, 
  selectedImage, 
  onImagesChange, 
  onProjectChange, 
  onSelectImage 
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          name: file.name,
          url: event.target.result,
          quantity: 1
        };
        onImagesChange([...images, newImage]);
        if (!selectedImage) {
          onSelectImage(newImage);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          name: file.name,
          url: event.target.result,
          quantity: 1
        };
        onImagesChange([...images, newImage]);
        if (!selectedImage) {
          onSelectImage(newImage);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="h-full flex">
      {/* Left Panel - Image List */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium text-slate-900">Images</h3>
          <p className="text-sm text-slate-500">{images.length} photos</p>
        </div>
        
        {/* Upload Area */}
        <div className="p-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-slate-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 mb-2">
              Drop images here or
            </p>
            <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
              <span>browse files</span>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileInput}
              />
            </label>
          </div>
        </div>

        {/* Image List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {images.map(image => (
            <div
              key={image.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedImage?.id === image.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => onSelectImage(image)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {image.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Quantity: {image.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="flex-1 flex flex-col">
        {selectedImage ? (
          <>
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-slate-900">
                    {selectedImage.name}
                  </h3>
                  <p className="text-sm text-slate-500">Photo Editor</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  <Edit className="w-4 h-4" />
                  Edit Photo
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 flex items-center justify-center p-8">
              <div className="max-w-4xl max-h-full">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Basic editing controls */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={selectedImage.quantity || 1}
                    onChange={(e) => {
                      const updatedImages = images.map(img =>
                        img.id === selectedImage.id
                          ? { ...img, quantity: parseInt(e.target.value) || 1 }
                          : img
                      );
                      onImagesChange(updatedImages);
                      onSelectImage({ ...selectedImage, quantity: parseInt(e.target.value) || 1 });
                    }}
                    className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No Image Selected
              </h3>
              <p className="text-slate-500">
                Select an image from the left panel to start editing
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 