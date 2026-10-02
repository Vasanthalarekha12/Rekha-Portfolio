import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ExternalLink, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCollection } from '../lib/db';
import SectionHeader from '../components/SectionHeader';
import TiltCard from '../components/TiltCard';
import InteractiveBackground from '../components/InteractiveBackground';
import InfiniteCarousel from '../components/InfiniteCarousel';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getCollection('projects', 'order');
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full py-24 relative overflow-hidden min-h-screen flex flex-col justify-center">
      <InteractiveBackground theme="projects" />
      <div className="max-w-[100vw] mx-auto w-full relative z-10 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <SectionHeader label="FEATURED PROJECTS" title1="Featured" title2="Projects" />
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-[var(--color-text-muted)] py-12">
            Projects are currently being updated. Please check back later.
          </div>
        ) : (
          <div className="relative mt-8 group/carousel w-full">
            <InfiniteCarousel speedDesktop={40} speedMobile={25}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-[min(84vw,320px)] sm:w-[360px] lg:w-[400px] shrink-0 flex transform-style-3d group"
                >
                  <TiltCard className="w-full h-full flex">
                    <div className="premium-card flex flex-col group/card overflow-hidden w-full h-full transform transition-all duration-500 ease-out">
                      <div className="relative h-56 md:h-64 overflow-hidden bg-[#111118]">
                        {project.imageUrl ? (
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover/card:scale-110"
                            style={{ transform: 'translateZ(20px)' }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5 font-medium">
                            No image available
                          </div>
                        )}
                        {/* Overlay for buttons on hover */}
                        <div className="absolute inset-0 bg-[var(--color-bg)]/60 backdrop-blur-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10" style={{ transform: 'translateZ(30px)' }}>
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-text-primary)] rounded-full font-medium hover:bg-[var(--color-accent)] hover:scale-105 transition-all">
                              <Code2 className="w-4 h-4" /> Code
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 text-[var(--color-text-primary)] border border-white/20 rounded-full font-medium hover:bg-white/20 hover:scale-105 transition-all">
                              <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                          )}
                        </div>
                        {/* Bottom gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--color-accent)]/0 via-[var(--color-accent)] to-[var(--color-accent)]/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20" />
                      </div>
                      
                      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 bg-[var(--color-surface)]">
                        <div className="flex flex-wrap gap-2 mb-4" style={{ transform: 'translateZ(10px)' }}>
                          {project.technologies?.slice(0, 4).map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-3 group-hover/card:text-[var(--color-accent)] transition-colors" style={{ transform: 'translateZ(15px)' }}>{project.title}</h3>
                        
                        <p className="text-[var(--color-text-muted)] text-sm md:text-base mb-6 line-clamp-3 leading-relaxed flex-grow" style={{ transform: 'translateZ(10px)' }}>
                          {project.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-5 border-t border-[var(--border-color-light)] mt-auto" style={{ transform: 'translateZ(5px)' }}>
                          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-[var(--color-text-muted)]">
                            <Calendar className="w-4 h-4" />
                            <span>{project.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </InfiniteCarousel>

          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
