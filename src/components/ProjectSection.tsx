
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectData } from '../pages/Index';
import { ImageGallery } from './ImageGallery';
import { EditableField } from './EditableField';

interface ProjectSectionProps {
  project: ProjectData;
  onUpdateProject: (projectId: string, updatedProject: Partial<ProjectData>) => void;
  isExpanded?: boolean;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  project,
  onUpdateProject,
  isExpanded = false
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [activeTab, setActiveTab] = useState<keyof ProjectData['images']>('elevation');
  const [isEditMode, setIsEditMode] = useState(false);

  const tabs = [
    { key: 'elevation', label: 'Elevation Designs', icon: '🏠' },
    { key: 'floorPlans', label: 'Floor Plans', icon: '📐' },
    { key: 'topView', label: 'Top View/Ceiling', icon: '⬆️' },
    { key: 'twoD', label: '2D Designs', icon: '📊' },
    { key: 'threeD', label: '3D Designs', icon: '🎨' }
  ] as const;

  const handleFieldUpdate = (field: keyof ProjectData, value: string) => {
    onUpdateProject(project.id, { [field]: value });
  };

  const getTotalImageCount = () => {
    return Object.values(project.images).reduce((total, images) => total + images.length, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-amber-100 overflow-hidden">
      {/* Project Header */}
      <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <EditableField
                value={project.title}
                onSave={(value) => handleFieldUpdate('title', value)}
                className="text-2xl font-bold text-amber-900"
                isEditMode={isEditMode}
              />
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                >
                  {isEditMode ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center space-x-2 text-amber-800 hover:text-amber-900"
                >
                  <span>{expanded ? 'Collapse' : 'Expand'}</span>
                  {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-amber-700 block mb-1">Description</label>
                <EditableField
                  value={project.description}
                  onSave={(value) => handleFieldUpdate('description', value)}
                  className="text-amber-800"
                  isEditMode={isEditMode}
                  multiline
                />
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-amber-700 block mb-1">Client</label>
                  <EditableField
                    value={project.client}
                    onSave={(value) => handleFieldUpdate('client', value)}
                    className="text-amber-800"
                    isEditMode={isEditMode}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-amber-700 block mb-1">Year</label>
                  <EditableField
                    value={project.date}
                    onSave={(value) => handleFieldUpdate('date', value)}
                    className="text-amber-800"
                    isEditMode={isEditMode}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <span className="text-sm text-amber-600">
                  {getTotalImageCount()} images total
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      {expanded && (
        <div className="p-6">
          {/* Image Category Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-amber-100">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'bg-amber-600 text-white border-b-2 border-amber-600'
                      : 'text-amber-700 hover:text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs">
                    {project.images[tab.key].length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery
            projectId={project.id}
            category={activeTab}
            images={project.images[activeTab]}
            onUpdateImages={(images) => {
              const updatedImages = { ...project.images, [activeTab]: images };
              onUpdateProject(project.id, { images: updatedImages });
            }}
          />
        </div>
      )}
    </div>
  );
};
