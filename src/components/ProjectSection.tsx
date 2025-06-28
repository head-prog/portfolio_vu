
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Edit3, Plus, Trash2 } from 'lucide-react';
import { ProjectData } from '../pages/Index';
import { ImageGallery } from './ImageGallery';
import { EditableField } from './EditableField';

interface ProjectSectionProps {
  project: ProjectData;
  onUpdateProject: (projectId: string, updatedProject: Partial<ProjectData>) => void;
  isExpanded?: boolean;
  isEditMode?: boolean;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  project,
  onUpdateProject,
  isExpanded = false,
  isEditMode = false
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [activeTab, setActiveTab] = useState<keyof ProjectData['images']>('elevation');

  const tabs = [
    { key: 'elevation', label: 'Elevation Designs', icon: '🏠', color: 'from-amber-500 to-orange-500' },
    { key: 'floorPlans', label: 'Floor Plans', icon: '📐', color: 'from-blue-500 to-indigo-500' },
    { key: 'topView', label: 'Top View/Ceiling', icon: '⬆️', color: 'from-green-500 to-teal-500' },
    { key: 'twoD', label: '2D Designs', icon: '📊', color: 'from-purple-500 to-pink-500' },
    { key: 'threeD', label: '3D Designs', icon: '🎨', color: 'from-red-500 to-rose-500' }
  ] as const;

  const handleFieldUpdate = (field: keyof ProjectData, value: string) => {
    onUpdateProject(project.id, { [field]: value });
  };

  const getTotalImageCount = () => {
    return Object.values(project.images).reduce((total, images) => total + images.length, 0);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Residential': 'bg-amber-100 text-amber-800 border-amber-300',
      'Commercial': 'bg-blue-100 text-blue-800 border-blue-300',
      'Hospitality': 'bg-purple-100 text-purple-800 border-purple-300',
      'Office': 'bg-orange-100 text-orange-800 border-orange-300',
      'Retail': 'bg-pink-100 text-pink-800 border-pink-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300 mb-6">
      {/* Project Header */}
      <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="p-6">
          {/* Project Title and Actions */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <EditableField
                value={project.title}
                onSave={(value) => handleFieldUpdate('title', value)}
                className="text-2xl font-bold"
                isEditMode={isEditMode}
                placeholder="Enter project title..."
                label="Project Title"
                fieldType="title"
              />
            </div>
            <div className="flex items-center space-x-3 ml-6">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center space-x-2 px-4 py-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100 rounded-lg transition-all duration-300"
              >
                <span className="font-medium">{expanded ? 'Collapse' : 'Expand'}</span>
                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <EditableField
                value={project.description}
                onSave={(value) => handleFieldUpdate('description', value)}
                isEditMode={isEditMode}
                multiline
                placeholder="Enter project description..."
                label="📝 Description"
                fieldType="description"
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditableField
                  value={project.client}
                  onSave={(value) => handleFieldUpdate('client', value)}
                  isEditMode={isEditMode}
                  placeholder="Enter client name..."
                  label="👤 Client"
                />
                <EditableField
                  value={project.date}
                  onSave={(value) => handleFieldUpdate('date', value)}
                  isEditMode={isEditMode}
                  placeholder="Enter year..."
                  label="📅 Year"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getCategoryColor(project.category)} shadow-sm`}>
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-2 text-amber-600">
                    <Eye size={16} />
                    <span className="text-sm font-medium">
                      {getTotalImageCount()} images total
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      {expanded && (
        <div className="p-6 bg-gradient-to-br from-white to-amber-50/30">
          {/* Image Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 border-b-2 border-amber-100 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`group relative px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg transform scale-105'
                      : 'text-amber-700 hover:text-amber-900 hover:bg-amber-50 border-2 border-amber-200 hover:border-amber-300'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab.key 
                      ? 'bg-white/20 text-white' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {project.images[tab.key].length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-amber-100/50 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-amber-800 flex items-center space-x-2">
                <span className="text-xl">{tabs.find(t => t.key === activeTab)?.icon}</span>
                <span>{tabs.find(t => t.key === activeTab)?.label}</span>
              </h3>
              <p className="text-sm text-amber-600 mt-1">
                Manage your {tabs.find(t => t.key === activeTab)?.label.toLowerCase()} images
              </p>
            </div>
            
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
        </div>
      )}
    </div>
  );
};
