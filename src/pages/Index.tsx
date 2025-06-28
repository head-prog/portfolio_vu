
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { LoginPage } from '@/components/LoginPage';
import { EditModeToggle } from '@/components/EditModeToggle';
import { Header } from '../components/Header';
import { ProjectSection } from '../components/ProjectSection';
import { ScrollToTop } from '../components/ScrollToTop';
import { AboutSection } from '../components/AboutSection';
import { EducationSection } from '../components/EducationSection';
import { ContactSection } from '../components/ContactSection';
import { EditableText } from '../components/EditableText';
import { SmoothScrollButton } from '../components/SmoothScrollButton';

export interface ImageData {
  id: string;
  file: File;
  url: string;
  name: string;
  description: string;
  category: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  client: string;
  date: string;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Office' | 'Retail';
  images: {
    elevation: ImageData[];
    floorPlans: ImageData[];
    topView: ImageData[];
    twoD: ImageData[];
    threeD: ImageData[];
  };
}

const Index = () => {
  const { isOwner, isGuest, loading: authLoading } = useAuth();
  const { userProfile, projects, loading: dataLoading, getPortfolioValue, updatePortfolioData } = usePortfolioData();
  const [isEditMode, setIsEditMode] = useState(false);

  const loading = authLoading || dataLoading;

  const updateProject = (projectId: string, updatedProject: Partial<ProjectData>) => {
    // This will be handled by the enhanced ProjectSection component
    console.log('Project update:', projectId, updatedProject);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-beige via-cream-white to-soft-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-primary-brown font-poppins">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Show login page if user is not authenticated and not accessing as guest
  if (!isOwner && !isGuest) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige via-cream-white to-soft-gray relative">
      {/* Beautiful background pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #8B4513 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, #DAA520 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <Header />
      <EditModeToggle 
        isEditMode={isEditMode} 
        onToggleEdit={() => setIsEditMode(!isEditMode)} 
      />
      
      {/* Hero Section with Enhanced Design */}
      <section id="home" className="relative py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-beige/50 via-cream-white/30 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-playfair font-bold text-primary-brown mb-6 animate-slide-up">
              <EditableText
                elementId="owner_name"
                initialValue={userProfile?.name || 'Sacha Subois'}
                className="inline-block"
                onSave={(value) => updatePortfolioData('text', 'owner_name', value)}
              />
            </h1>
            <p className="text-2xl md:text-3xl text-secondary-brown mb-4 font-poppins animate-fade-in-delay-1">
              <EditableText
                elementId="professional_title"
                initialValue={userProfile?.title || 'Interior Designer'}
                className="inline-block"
                onSave={(value) => updatePortfolioData('text', 'professional_title', value)}
              />
            </p>
            <p className="text-xl text-text-dark mb-12 max-w-3xl mx-auto leading-relaxed font-inter animate-fade-in-delay-2">
              <EditableText
                elementId="hero_description"
                initialValue={getPortfolioValue('text', 'hero_description', 'Creating beautiful, functional spaces that reflect your unique style and personality. Transforming visions into stunning realities through thoughtful design and meticulous attention to detail.')}
                className="block"
                multiline
                onSave={(value) => updatePortfolioData('text', 'hero_description', value)}
              />
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-delay-3">
              <SmoothScrollButton
                targetId="projects"
                className="px-8 py-4 bg-gradient-to-r from-primary-brown to-secondary-brown text-white rounded-full font-poppins font-semibold text-lg"
              >
                View Portfolio
              </SmoothScrollButton>
              <SmoothScrollButton
                targetId="contact"
                className="px-8 py-4 border-2 border-primary-brown text-primary-brown rounded-full font-poppins font-semibold hover:bg-primary-brown hover:text-white transition-all duration-300 text-lg"
              >
                Get In Touch
              </SmoothScrollButton>
            </div>
          </div>
        </div>
        
        {/* Floating elements with improved animations */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent-gold/20 rounded-full animate-floating-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-brown/20 rounded-full animate-floating-fast"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary-brown/10 rounded-full animate-floating-medium"></div>
      </section>

      {/* Enhanced About Section */}
      <AboutSection isEditMode={isEditMode && isOwner} />

      {/* Enhanced Education Section */}
      <EducationSection isEditMode={isEditMode && isOwner} />

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-primary-brown mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto font-inter">
              <EditableText
                elementId="projects_description"
                initialValue={getPortfolioValue('text', 'projects_description', 'Discover our portfolio of exceptional interior design projects, each crafted with passion and precision.')}
                className="inline-block"
                onSave={(value) => updatePortfolioData('text', 'projects_description', value)}
              />
            </p>
          </div>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ProjectSection
                  project={project}
                  onUpdateProject={updateProject}
                  isExpanded={index === 0}
                  isEditMode={isEditMode && isOwner}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <ContactSection isEditMode={isEditMode && isOwner} />

      <ScrollToTop />
    </div>
  );
};

export default Index;
