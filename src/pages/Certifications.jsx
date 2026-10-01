import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, FileText, ChevronDown, X, ZoomIn } from 'lucide-react';
import { getCollection } from '../lib/db';
import SectionHeader from '../components/SectionHeader';
import TiltCard from '../components/TiltCard';
import InteractiveBackground from '../components/InteractiveBackground';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const initialDisplayCount = 3;

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await getCollection('certifications', 'order');
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      <InteractiveBackground theme="certifications" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader label="MY ACHIEVEMENTS" title1="My" title2="Certifications" />

        {certifications.length === 0 ? (
          <div className="text-center text-[var(--color-text-muted)] py-12">
            Certifications are currently being updated.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {(showAll ? certifications : certifications.slice(0, initialDisplayCount)).map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    className="h-full flex"
                  >
                  <TiltCard className="w-full h-full flex">
                    <div className="premium-card flex flex-col h-full group w-full relative overflow-hidden">
                      {/* Image Thumbnail Area */}
                      <div className="relative w-full aspect-[4/3] bg-[var(--color-bg)] overflow-hidden border-b border-[var(--border-color-light)]">
                        {cert.pdfUrl ? (
                          <>
                            {cert.pdfUrl.toLowerCase().endsWith('.pdf') ? (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent text-[var(--color-text-muted)] group-hover:scale-105 transition-transform duration-700">
                                <FileText className="w-16 h-16 opacity-30" />
                              </div>
                            ) : (
                              <img 
                                src={cert.pdfUrl} 
                                alt={cert.name} 
                                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                              />
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text-muted)]">
                            <Award className="w-12 h-12 opacity-30" />
                          </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[var(--color-bg)]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                          {cert.pdfUrl && (
                            <button 
                              onClick={() => setSelectedCert(cert.pdfUrl)}
                              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent)] hover:scale-105 transition-all shadow-lg"
                            >
                              <ZoomIn className="w-4 h-4" /> View Credential
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex flex-col flex-grow relative z-20 bg-[var(--surface)]">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-2.5 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300 shrink-0 border border-[var(--color-accent)]/20">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[var(--color-text-primary)] leading-tight mb-1 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{cert.name}</h3>
                            {cert.organization && (
                              <p className="text-[var(--color-text-muted)] text-sm font-medium">{cert.organization}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--border-color-light)]">
                          {cert.date && (
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-text-muted)] bg-[var(--color-bg)] px-2.5 py-1 rounded-md border border-[var(--border-color-light)]">
                              {cert.date}
                            </span>
                          )}
                          {cert.verifyUrl && (
                            <a 
                              href={cert.verifyUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent)] hover:text-orange-400 uppercase tracking-wide cursor-interactive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Verify
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
            
            {certifications.length > initialDisplayCount && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-[var(--color-accent)]/50 text-[var(--color-accent)] rounded-full font-medium overflow-hidden transition-all hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(255,122,0,0.2)] active:scale-95 cursor-interactive"
                >
                  <span>{showAll ? 'Show Less' : 'Explore More'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-white/10 text-white rounded-full hover:bg-[var(--color-accent)] transition-colors z-50 cursor-interactive"
              onClick={() => setSelectedCert(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[80vh] bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color-light)]"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedCert.toLowerCase().endsWith('.pdf') ? (
                <iframe 
                  src={`${selectedCert}#toolbar=0&navpanes=0&scrollbar=0`} 
                  className="w-full h-full border-none"
                  title="Certificate Viewer"
                />
              ) : (
                <img 
                  src={selectedCert} 
                  alt="Certificate" 
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;
