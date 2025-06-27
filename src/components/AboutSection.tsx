
import React, { useState } from 'react';
import { EditableField } from './EditableField';

export const AboutSection = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [aboutData, setAboutData] = useState({
    name: 'Sacha Subois',
    title: 'Interior Designer',
    bio: 'With over a decade of experience in creating exceptional interior spaces, I specialize in transforming ordinary rooms into extraordinary experiences. My approach combines contemporary aesthetics with functional design, ensuring every space tells a unique story.',
    experience: '10+ Years',
    projects: '150+ Projects',
    clients: '200+ Happy Clients',
    specializations: ['Residential Design', 'Commercial Spaces', 'Space Planning', 'Color Consultation']
  });

  const handleFieldUpdate = (field: keyof typeof aboutData, value: string | string[]) => {
    setAboutData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-cream-white/50 to-warm-beige/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold text-primary-brown mb-6">
            About Me
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto font-inter">
            Passionate about creating spaces that inspire and transform lives
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Photo Section */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="relative inline-block">
              <div className="w-80 h-80 mx-auto lg:mx-0 rounded-full overflow-hidden bg-gradient-to-br from-primary-brown/20 to-secondary-brown/20 p-4 animate-scale-hover">
                <div className="w-full h-full rounded-full bg-warm-beige flex items-center justify-center">
                  <div className="text-6xl text-primary-brown font-playfair">S</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-gold rounded-full animate-pulse-soft"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-brown rounded-full animate-floating-fast"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="px-4 py-2 bg-primary-brown text-white rounded-lg hover:bg-secondary-brown transition-colors text-sm font-poppins"
              >
                {isEditMode ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div>
              <EditableField
                value={aboutData.name}
                onSave={(value) => handleFieldUpdate('name', value)}
                className="text-4xl font-playfair font-bold text-primary-brown mb-2"
                isEditMode={isEditMode}
                placeholder="Your Name"
              />
              <EditableField
                value={aboutData.title}
                onSave={(value) => handleFieldUpdate('title', value)}
                className="text-2xl font-poppins text-secondary-brown mb-6"
                isEditMode={isEditMode}
                placeholder="Your Title"
              />
            </div>

            <EditableField
              value={aboutData.bio}
              onSave={(value) => handleFieldUpdate('bio', value)}
              className="text-lg text-text-dark leading-relaxed font-inter"
              isEditMode={isEditMode}
              multiline
              placeholder="Tell your story..."
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-card-gradient rounded-xl hover-lift">
                <EditableField
                  value={aboutData.experience}
                  onSave={(value) => handleFieldUpdate('experience', value)}
                  className="text-2xl font-bold text-primary-brown font-poppins"
                  isEditMode={isEditMode}
                  placeholder="Years"
                />
                <p className="text-sm text-text-light font-inter">Experience</p>
              </div>
              <div className="text-center p-4 bg-card-gradient rounded-xl hover-lift">
                <EditableField
                  value={aboutData.projects}
                  onSave={(value) => handleFieldUpdate('projects', value)}
                  className="text-2xl font-bold text-primary-brown font-poppins"
                  isEditMode={isEditMode}
                  placeholder="Projects"
                />
                <p className="text-sm text-text-light font-inter">Completed</p>
              </div>
              <div className="text-center p-4 bg-card-gradient rounded-xl hover-lift">
                <EditableField
                  value={aboutData.clients}
                  onSave={(value) => handleFieldUpdate('clients', value)}
                  className="text-2xl font-bold text-primary-brown font-poppins"
                  isEditMode={isEditMode}
                  placeholder="Clients"
                />
                <p className="text-sm text-text-light font-inter">Satisfied</p>
              </div>
            </div>

            {/* Specializations */}
            <div className="mt-8">
              <h3 className="text-xl font-poppins font-semibold text-primary-brown mb-4">Specializations</h3>
              <div className="flex flex-wrap gap-3">
                {aboutData.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-accent-gold/20 text-primary-brown rounded-full text-sm font-poppins hover:bg-accent-gold/30 transition-colors"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
