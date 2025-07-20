import React, { useState } from 'react';
import { Printer, Download, FileImage, Package } from 'lucide-react';

export default function ExportView({ project, images, onProjectChange }) {
  const [exportFormat, setExportFormat] = useState('jpg');
  const [printSize, setPrintSize] = useState('4x6');

  const totalPrints = images.reduce((sum, img) => sum + (img.quantity || 1), 0);
  const estimatedCost = totalPrints * 0.29; // $0.29 per print

  const handlePrint = () => {
    console.log('Printing project:', project);
    alert('Print job sent! (This is a demo)');
  };

  const handleExport = () => {
    console.log('Exporting project as:', exportFormat);
    alert(`Exporting ${images.length} images as ${exportFormat.toUpperCase()} files! (This is a demo)`);
  };

  return (
    <div className="h-full p-6 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Printer className="w-6 h-6" />
            Print & Export
          </h2>
          <p className="text-slate-600">
            Print your photos or export them for external use
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No images to print or export</p>
            <p className="text-slate-400">Add some photos first in the Editor tab</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Print Section */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-blue-600" />
                  Print Photos
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Print Size
                    </label>
                    <select 
                      value={printSize}
                      onChange={(e) => setPrintSize(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="4x6">4" × 6" ($0.29 each)</option>
                      <option value="5x7">5" × 7" ($0.89 each)</option>
                      <option value="8x10">8" × 10" ($2.99 each)</option>
                      <option value="11x14">11" × 14" ($7.99 each)</option>
                    </select>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Total Images:</span>
                      <span className="font-medium">{images.length}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Total Prints:</span>
                      <span className="font-medium">{totalPrints}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium text-slate-900">Estimated Cost:</span>
                      <span className="font-bold text-blue-600">${estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePrint}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    Send to Print
                  </button>
                </div>
              </div>
            </div>

            {/* Export Section */}
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-600" />
                  Export Photos
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Export Format
                    </label>
                    <select 
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="jpg">JPEG (.jpg)</option>
                      <option value="png">PNG (.png)</option>
                      <option value="pdf">PDF Document (.pdf)</option>
                      <option value="zip">ZIP Archive (.zip)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Quality Settings
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option value="high">High Quality (Large file)</option>
                      <option value="medium">Medium Quality (Balanced)</option>
                      <option value="low">Low Quality (Small file)</option>
                    </select>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Files to export:</span>
                      <span className="font-medium">{images.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Format:</span>
                      <span className="font-medium">{exportFormat.toUpperCase()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleExport}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Export Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Preview ({images.length} images)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    ×{image.quantity || 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 