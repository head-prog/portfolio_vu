
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ProjectSection } from '../components/ProjectSection';
import { ScrollToTop } from '../components/ScrollToTop';

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
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? { ...project, ...updatedProject } : project
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">
            Interior Design Portfolio
          </h1>
          <p className="text-xl text-amber-800 mb-8 leading-relaxed">
            Creating beautiful, functional spaces that reflect your unique style and personality.
            Explore our collection of residential and commercial design projects.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-amber-700">
            <span>7 Featured Projects</span>
            <span>•</span>
            <span>Residential & Commercial</span>
            <span>•</span>
            <span>Complete Design Solutions</span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">
            Featured Projects
          </h2>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <ProjectSection
                key={project.id}
                project={project}
                onUpdateProject={updateProject}
                isExpanded={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-8">About Our Design Philosophy</h2>
          <p className="text-lg text-amber-800 leading-relaxed mb-8">
            We believe that great interior design is about more than just aesthetics—it's about creating 
            spaces that enhance your daily life. Our approach combines functionality with beauty, 
            ensuring every element serves a purpose while contributing to the overall harmony of the space.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-900">🏠</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Residential Design</h3>
              <p className="text-amber-700">Creating comfortable, stylish homes that reflect your personality.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-900">🏢</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Commercial Spaces</h3>
              <p className="text-amber-700">Professional environments that inspire productivity and success.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-900">✨</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Custom Solutions</h3>
              <p className="text-amber-700">Tailored design solutions that meet your specific needs and vision.</p>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Index;
