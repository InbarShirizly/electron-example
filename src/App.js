import React, { useState, useEffect } from "react";
import { Save, AlertTriangle, Edit, ListOrdered, Printer, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import EditorView from './components/editor/EditorView';
import SelectionView from './components/editor/SelectionView';
import ExportView from './components/editor/ExportView';
import ProjectSettingsView from './components/editor/ProjectSettingsView';

const TABS = [
    { id: 'edit', label: 'Editor', icon: Edit },
    { id: 'select', label: 'Selection & Ordering', icon: ListOrdered },
    { id: 'settings', label: 'Project Settings', icon: Settings },
    { id: 'export', label: 'Print & Export', icon: Printer }
];

export default function App() {
  const [project, setProject] = useState({
    id: '1',
    name: 'My Photo Project',
    images: []
  });
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');

  const saveProject = async () => {
    if (!project || !hasUnsavedChanges) return;
    
    setIsSaving(true);
    try {
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUnsavedChanges(false);
      console.log('Project saved:', project);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProjectDataChange = (updates) => {
    setProject(prev => ({...prev, ...updates}));
    setHasUnsavedChanges(true);
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    setHasUnsavedChanges(true);
  };
  
  const handleSelectedImageChange = (newSelectedImage) => {
      setSelectedImage(newSelectedImage);
  };

  const handleEditImageFromSelection = (imageToEdit) => {
    setSelectedImage(imageToEdit);
    setActiveTab('edit');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
        <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{error}</h3>
                <button className="btn btn-outline">Back to Projects</button>
            </div>
        </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-white border-b p-4 flex items-center justify-between z-20">
            <div>
                <h2 className="text-lg font-semibold text-slate-900 truncate">
                    {project.name}
                </h2>
                <p className="text-xs text-slate-500">
                    MagnetCraft Photo Editor
                </p>
            </div>
            
            <div className="absolute left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                                activeTab === tab.id 
                                    ? 'bg-white shadow-sm text-blue-600' 
                                    : 'text-slate-600 hover:bg-white/50'
                            }`}
                        >
                            <tab.icon className="w-4 h-4"/>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {hasUnsavedChanges && (
                    <span className="text-orange-600 border border-orange-200 bg-orange-50 px-2 py-1 rounded text-sm">
                        Unsaved Changes
                    </span>
                )}
                <button 
                    onClick={saveProject}
                    disabled={isSaving || !hasUnsavedChanges}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save Project"}
                </button>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                >
                    {activeTab === 'edit' && (
                        <EditorView
                            project={project}
                            images={images}
                            selectedImage={selectedImage}
                            onImagesChange={handleImagesChange}
                            onProjectChange={handleProjectDataChange}
                            onSelectImage={handleSelectedImageChange}
                        />
                    )}
                    {activeTab === 'select' && (
                        <SelectionView
                            images={images}
                            onImagesChange={handleImagesChange}
                            onEditImage={handleEditImageFromSelection}
                        />
                    )}
                    {activeTab === 'settings' && (
                        <ProjectSettingsView
                            project={project}
                            images={images}
                            onProjectChange={handleProjectDataChange}
                        />
                    )}
                    {activeTab === 'export' && (
                        <ExportView
                            project={project}
                            images={images}
                            onProjectChange={handleProjectDataChange}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
  );
} 