import React from 'react';
import { Edit, Trash2, GripVertical } from 'lucide-react';

export default function SelectionView({ images, onImagesChange, onEditImage }) {
  const handleQuantityChange = (imageId, newQuantity) => {
    const updatedImages = images.map(img =>
      img.id === imageId ? { ...img, quantity: parseInt(newQuantity) || 1 } : img
    );
    onImagesChange(updatedImages);
  };

  const handleRemoveImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    onImagesChange(updatedImages);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    onImagesChange(updatedImages);
  };

  return (
    <div className="h-full p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Selection & Ordering
          </h2>
          <p className="text-slate-600">
            Manage your images, set quantities, and arrange order for printing
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No images added yet</p>
            <p className="text-slate-400">Go to the Editor tab to add photos</p>
          </div>
        ) : (
          <div className="space-y-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                  <span className="text-sm font-medium text-slate-500 w-8">
                    #{index + 1}
                  </span>
                </div>

                <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-900 truncate">
                    {image.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Image {index + 1} of {images.length}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-700">
                      Qty:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={image.quantity || 1}
                      onChange={(e) => handleQuantityChange(image.id, e.target.value)}
                      className="w-16 px-2 py-1 border border-slate-300 rounded text-sm text-center"
                    />
                  </div>

                  <button
                    onClick={() => onEditImage(image)}
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">
                  Total Images: {images.length}
                </span>
                <span className="font-medium text-slate-700">
                  Total Prints: {images.reduce((sum, img) => sum + (img.quantity || 1), 0)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 