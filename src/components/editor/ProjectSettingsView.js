import React from 'react';
import { Settings, Folder } from 'lucide-react';

export default function ProjectSettingsView({ project, images, onProjectChange }) {
  const handleProjectNameChange = (e) => {
    onProjectChange({ name: e.target.value });
  };

  return (
    <div className="h-full p-6 bg-white overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Project Settings
          </h2>
          <p className="text-slate-600">
            Configure your project details and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Project Information */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Folder className="w-5 h-5" />
              Project Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={project.name || ''}
                  onChange={handleProjectNameChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter project name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project ID
                </label>
                <input
                  type="text"
                  value={project.id || ''}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Project Statistics */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Project Statistics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">
                  {images.length}
                </div>
                <div className="text-sm text-slate-600">Total Images</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">
                  {images.reduce((sum, img) => sum + (img.quantity || 1), 0)}
                </div>
                <div className="text-sm text-slate-600">Total Prints</div>
              </div>
            </div>
          </div>

          {/* Photo Settings */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Photo Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Default Print Size
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="4x6">4" × 6"</option>
                  <option value="5x7">5" × 7"</option>
                  <option value="8x10">8" × 10"</option>
                  <option value="11x14">11" × 14"</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Photo Quality
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="high">High Quality</option>
                  <option value="medium">Medium Quality</option>
                  <option value="low">Low Quality</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Auto-enhance photos
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Auto-crop to fit print size
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 