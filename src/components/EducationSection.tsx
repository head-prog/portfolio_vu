
import React, { useState } from 'react';
import { EditableField } from './EditableField';

interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
  description: string;
}

interface EducationSectionProps {
  isEditMode: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ isEditMode }) => {
  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      period: '2014 - 2018',
      degree: 'Bachelor of Design',
      institution: 'Borcelle University',
      description: 'Comprehensive study in interior design principles, space planning, color theory, and sustainable design practices. Graduated with honors.'
    },
    {
      id: '2',
      period: '2015 - 2019',
      degree: 'Bachelor of Design',
      institution: 'Salford & Co. University', 
      description: 'Advanced coursework in commercial design, project management, and client relations. Specialized in hospitality and retail design.'
    }
  ]);

  const handleEducationUpdate = (id: string, field: keyof Education, value: string) => {
    if (!isEditMode) return;
    
    setEducation(prev => prev.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <section id="education" className="py-20 px-4 bg-soft-gray/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold text-primary-brown mb-6">
            Education
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto font-inter">
            Building expertise through continuous learning and professional development
          </p>
        </div>

        {isEditMode && (
          <div className="flex items-center justify-center mb-8">
            <div className="px-4 py-2 bg-primary-brown/10 text-primary-brown rounded-lg font-poppins">
              Edit Mode Active - Click any text to edit
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-brown to-secondary-brown rounded-full"></div>

          <div className="space-y-16">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-card-gradient rounded-2xl p-8 shadow-lg hover-lift">
                    {/* Period */}
                    <EditableField
                      value={edu.period}
                      onSave={(value) => handleEducationUpdate(edu.id, 'period', value)}
                      className="text-sm font-poppins font-semibold text-accent-gold mb-2"
                      isEditMode={isEditMode}
                      placeholder="Period"
                    />
                    
                    {/* Degree */}
                    <EditableField
                      value={edu.degree}
                      onSave={(value) => handleEducationUpdate(edu.id, 'degree', value)}
                      className="text-xl font-poppins font-bold text-primary-brown mb-2"
                      isEditMode={isEditMode}
                      placeholder="Degree"
                    />
                    
                    {/* Institution */}
                    <EditableField
                      value={edu.institution}
                      onSave={(value) => handleEducationUpdate(edu.id, 'institution', value)}
                      className="text-lg font-poppins text-secondary-brown mb-4"
                      isEditMode={isEditMode}
                      placeholder="Institution"
                    />
                    
                    {/* Description */}
                    <EditableField
                      value={edu.description}
                      onSave={(value) => handleEducationUpdate(edu.id, 'description', value)}
                      className="text-text-dark font-inter leading-relaxed"
                      isEditMode={isEditMode}
                      multiline
                      placeholder="Description"
                    />
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-brown to-secondary-brown rounded-full shadow-lg">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-accent-gold rounded-full animate-pulse-soft"></div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-accent-gold/10 rounded-full animate-floating-slow"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-primary-brown/10 rounded-full animate-floating-medium"></div>
      </div>
    </section>
  );
};
