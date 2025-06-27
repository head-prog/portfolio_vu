import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginPage } from '@/components/LoginPage';
import { EditModeToggle } from '@/components/EditModeToggle';
import { Header } from '../components/Header';
import { ProjectSection } from '../components/ProjectSection';
import { ScrollToTop } from '../components/ScrollToTop';
import { AboutSection } from '../components/AboutSection';
import { EducationSection } from '../components/EducationSection';
import { ContactSection } from '../components/ContactSection';

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
  const { isOwner, isGuest, loading } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: '1',
      title: 'Project - Pankaj Pandey',
      description: 'Residential Interior Design - A modern residential space featuring warm tones and contemporary furniture.',
      client: 'Mr. Pankaj Pandey',
      date: '2024',
      category: 'Residential',
      images: {
        elevation: [],
        floorPlans: [],
        topView: [],
        twoD: [],
        threeD: []
      }
    },
    {
      id: '2',
      title: 'Project - Naresh Ahirwar',
      description: 'Modern Home Design - Contemporary living spaces with clean lines and functional layouts.',
      client: 'Mr. Naresh Ahirwar',
      date: '2024',
      category: 'Residential',
      images: {
        elevation: [],
        floorPlans: [],
        topView: [],
        twoD: [],
        threeD: []
      }
    },
    {
      id: '3',
      title: 'Project - Mr. Kulkarni',
      description: 'Family Home - Spacious family residence with traditional elements and modern comfort.',
      client: 'Mr. Kulkarni',
      date: '2024',
      category: 'Residential',
      images: {
        elevation: [],
        floorPlans: [],
        topView: [],
        twoD: [],
        threeD: []
      }
    },
    {
      id: '4',
      title: 'Project - Paresh Patel',
      description: 'Contemporary Living - Minimalist design approach with emphasis on natural lighting.',
      client: 'Mr. Paresh Patel',
      date: '2024',
      category: 'Residential',
      images: {
        elevation: [],
        floorPlans: [],
        topView: [],
        twoD: [],
        threeD: []
      }
    },
    {
      id: '5',
      title: 'Project - Mr. Jhaveri',
      description: 'Luxury Residence - High-end residential project with premium finishes and custom details.',
      client: 'Mr. Jhaveri',
      date: '2024',
      category: 'Residential',
      images: {
        elevation: [],
        floorPlans: [],
        topView: [],
        twoD: [],
        threeD: []
      }
    },
    {
      id: '6',
      title: 'Project - Yash',
      description: 'Minimalist Design - Clean, uncluttered spaces emphasizing form and function.',
      client: 'Mr. Yash',
      date: '2024',
      category: 'Residential',
      images: {
        elevation: [],
        floorPlans: [],
        topView: [],
        twoD: [],
        threeD: []
      }
    },
    {
      id: '7',
      title: 'Project - Custom',
      description: 'New Project Template - Customizable project template for future designs.',
      client: 'Custom Client',
      date: '2024',
      category: 'Residential',
      images: {
        elevation: [],
        floorPlans: [],
        topView: [],
        twoD: [],
        threeD: []
      }
    }
  ]);

  const updateProject = (projectId: string, updatedProject: Partial<ProjectData>) => {
    if (!isOwner) return; // Prevent updates if not owner
    
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? { ...project, ...updatedProject } : project
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-beige via-cream-white to-soft-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-primary-brown font-poppins">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if user is not authenticated and not accessing as guest
  if (!isOwner && !isGuest) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige via-cream-white to-soft-gray">
      <Header />
      <EditModeToggle 
        isEditMode={isEditMode} 
        onToggleEdit={() => setIsEditMode(!isEditMode)} 
      />
      
      {/* Hero Section with Beautiful Animations */}
      <section id="home" className="relative py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-beige/50 via-cream-white/30 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-playfair font-bold text-primary-brown mb-6 animate-slide-up">
              Sacha Subois
            </h1>
            <p className="text-2xl md:text-3xl text-secondary-brown mb-4 font-poppins animate-fade-in-delay-1">
              Interior Designer
            </p>
            <p className="text-xl text-text-dark mb-12 max-w-3xl mx-auto leading-relaxed font-inter animate-fade-in-delay-2">
              Creating beautiful, functional spaces that reflect your unique style and personality.
              Transforming visions into stunning realities through thoughtful design and meticulous attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-delay-3">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-brown to-secondary-brown text-white rounded-full font-poppins font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg">
                View Portfolio
              </button>
              <button className="px-8 py-4 border-2 border-primary-brown text-primary-brown rounded-full font-poppins font-semibold hover:bg-primary-brown hover:text-white transition-all duration-300 text-lg">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent-gold/20 rounded-full animate-floating-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-brown/20 rounded-full animate-floating-fast"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary-brown/10 rounded-full animate-floating-medium"></div>
      </section>

      {/* About Section */}
      <AboutSection isEditMode={isEditMode && isOwner} />

      {/* Education Section */}
      <EducationSection isEditMode={isEditMode && isOwner} />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-primary-brown mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto font-inter">
              Discover our portfolio of exceptional interior design projects, each crafted with passion and precision.
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

      {/* Contact Section */}
      <ContactSection isEditMode={isEditMode && isOwner} />

      <ScrollToTop />
    </div>
  );
};

export default Index;
