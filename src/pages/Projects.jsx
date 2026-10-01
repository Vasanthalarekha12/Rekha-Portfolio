import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ExternalLink, Calendar, ChevronDown } from 'lucide-react';
import { getCollection } from '../lib/db';
import SectionHeader from '../components/SectionHeader';
import TiltCard from '../components/TiltCard';
import InteractiveBackground from '../components/InteractiveBackground';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 3;

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
    <div className="w-full py-24 relative overflow-hidden min-h-screen">
      <InteractiveBackground theme="projects" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="FEATURED PROJECTS" title1="Featured" title2="Projects" />

        {projects.length === 0 ? (
          <div className="text-center text-[var(--color-text-muted)] py-12">
            Projects are currently being updated. Please check back later.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <AnimatePresence mode="popLayout">
                {(showAll ? projects : projects.slice(0, initialDisplayCount)).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    className="h-full w-full"
                  >
                    <TiltCard className="w-full h-full flex">
                      <div className="premium-card flex flex-col group overflow-hidden w-full h-full">
                  <div className="relative h-56 overflow-hidden bg-[#111118]">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5 font-medium">
                        No image available
                      </div>
                    )}
                    {/* Overlay for buttons on hover */}
                    <div className="absolute inset-0 bg-[var(--color-bg)]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
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
                    {/* Overlay gradient for text readability at bottom of image if needed, or just a border */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--color-accent)]/0 via-[var(--color-accent)] to-[var(--color-accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow relative z-20 bg-[#111118]">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 4).map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">{project.title}</h3>
                    
                    <p className="text-[var(--color-text-muted)] text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                      <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-muted)]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>
                    </div>
                </TiltCard>
                </motion.div>
              ))}
              </AnimatePresence>
          </div>
          
          {projects.length > initialDisplayCount && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-[var(--color-accent)]/50 text-[var(--color-accent)] rounded-full font-medium overflow-hidden transition-all hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(255,122,0,0.2)] active:scale-95"
              >
                <span>{showAll ? 'Show Less' : 'Explore More'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
              </button>
            </div>
          )}
        </>
        )}
      </div>
    </div>
  );
};

export default Projects;
