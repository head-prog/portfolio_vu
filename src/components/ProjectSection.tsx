
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
      'Residential': 'bg-green-100 text-green-800 border-green-200',
      'Commercial': 'bg-blue-100 text-blue-800 border-blue-200',
      'Hospitality': 'bg-purple-100 text-purple-800 border-purple-200',
      'Office': 'bg-orange-100 text-orange-800 border-orange-200',
      'Retail': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
      {/* Project Header */}
      <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-b border-amber-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DAA520' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        <div className="relative p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <EditableField
                  value={project.title}
                  onSave={(value) => handleFieldUpdate('title', value)}
                  className="text-3xl font-bold text-amber-900 hover:text-amber-800 transition-colors"
                  isEditMode={isEditMode}
                />
                <div className="flex items-center space-x-3">
                  {isEditMode && (
                    <button className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-lg transition-colors">
                      <Edit3 size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center space-x-2 px-4 py-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100 rounded-lg transition-all duration-300 group/btn"
                  >
                    <span className="font-medium">{expanded ? 'Collapse' : 'Expand'}</span>
                    <div className="transform group-hover/btn:scale-110 transition-transform">
                      {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-amber-700 block mb-2 flex items-center">
                      📝 Project Description
                    </label>
                    <EditableField
                      value={project.description}
                      onSave={(value) => handleFieldUpdate('description', value)}
                      className="text-amber-800 leading-relaxed"
                      isEditMode={isEditMode}
                      multiline
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-amber-700 block mb-2 flex items-center">
                        👤 Client
                      </label>
                      <EditableField
                        value={project.client}
                        onSave={(value) => handleFieldUpdate('client', value)}
                        className="text-amber-800 font-medium"
                        isEditMode={isEditMode}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-amber-700 block mb-2 flex items-center">
                        📅 Year
                      </label>
                      <EditableField
                        value={project.date}
                        onSave={(value) => handleFieldUpdate('date', value)}
                        className="text-amber-800 font-medium"
                        isEditMode={isEditMode}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getCategoryColor(project.category)} shadow-sm`}>
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-2 text-amber-600">
                    <Eye size={16} />
                    <span className="text-sm font-medium">
                      {getTotalImageCount()} images total
                    </span>
                  </div>
                </div>
                
                {isEditMode && (
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors" title="Add Project">
                      <Plus size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors" title="Delete Project">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      {expanded && (
        <div className="p-8 bg-gradient-to-br from-white to-amber-50/30">
          {/* Image Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 border-b border-amber-100 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`group relative px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg transform scale-105'
                      : 'text-amber-700 hover:text-amber-900 hover:bg-amber-50 border border-amber-200'
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
                  
                  {/* Active tab indicator */}
                  {activeTab === tab.key && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-amber-100/50 p-6">
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
