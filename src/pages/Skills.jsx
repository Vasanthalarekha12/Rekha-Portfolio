import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCollection } from '../lib/db';
import { Layers, Database, BarChart, Settings, Code, Zap, Monitor, Sparkles, Server } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import InteractiveBackground from '../components/InteractiveBackground';

const iconMap = {
  'Frontend Engineering': Monitor,
  'Backend & Cloud': Server,
  'AI & Data': Sparkles,
  'Tools & Technologies': Settings,
  'Programming': Code,
  'Database': Database,
  'Analytics': BarChart,
  'Visualization': Layers,
  'Automation': Zap,
  'Other': Settings
};

const getIcon = (categoryName) => {
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (categoryName.toLowerCase().includes(key.toLowerCase())) return Icon;
  }
  return Settings;
};

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getCollection('skills');
        const grouped = data.reduce((acc, curr) => {
          const cat = curr.category || 'Other';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(curr);
          return acc;
        }, {});
        
        const formattedData = Object.entries(grouped).map(([category, skills]) => ({ category, skills }));
        setSkillsData(formattedData);
        if (formattedData.length > 0) setActiveCategory(formattedData[0].category);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
      </div>
    );
  }

  const activeGroup = skillsData.find(g => g.category === activeCategory) || skillsData[0];

  return (
    <div className="w-full py-24 relative overflow-hidden min-h-screen">
      <InteractiveBackground theme="skills" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="MY SKILLS" title1="Technical" title2="Capabilities" />

        {skillsData.length === 0 ? (
          <div className="text-center text-[var(--color-text-muted)] py-12">
            Skills are currently being updated.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
            
            {/* Left: Featured Visual Panel */}
            <div className="w-full lg:col-span-5 h-[300px] lg:h-[650px] relative premium-card !rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent z-10 opacity-80" />
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                alt="Cyber Technology" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-[var(--color-accent)]/10 z-10 mix-blend-overlay" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex items-center gap-3 mb-3 opacity-80">
                  <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                  <span className="font-mono text-sm tracking-widest uppercase text-white">Tech Ecosystem</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {activeCategory || 'Capabilities'}
                </h3>
                <p className="text-white/60 text-sm max-w-sm">
                  Explore my technical proficiency across {skillsData.length} core domains and {skillsData.reduce((acc, curr) => acc + curr.skills.length, 0)}+ discrete technologies.
                </p>
              </div>
            </div>

            {/* Right: Interactive Ecosystem */}
            <div className="w-full lg:col-span-7 flex flex-col gap-6">
              
              {/* Category Selector (Desktop & Mobile) */}
              <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                {skillsData.map((group) => {
                  const Icon = getIcon(group.category);
                  const isActive = activeCategory === group.category;
                  return (
                    <button
                      key={group.category}
                      onClick={() => setActiveCategory(group.category)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl border whitespace-nowrap transition-all duration-300 ${
                        isActive 
                          ? 'bg-[var(--color-surface-elevated)] border-[var(--color-accent)] shadow-[0_0_15px_rgba(255,122,0,0.1)]' 
                          : 'bg-[var(--color-surface)] border-[var(--color-border-light)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-elevated)]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`} />
                      <span className={`text-sm font-semibold ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}`}>
                        {group.category}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop Orbit Constellation (Hidden on Mobile) */}
              <div className="hidden lg:flex w-full relative min-h-[520px] items-center justify-center premium-card !rounded-3xl border border-[var(--color-border)] p-8 overflow-hidden bg-[var(--color-bg)]">
              
              {/* Background ambient glow for active category */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--color-accent)] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="w-full h-full relative flex items-center justify-center"
                >
                  
                  {/* Central Node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-24 h-24 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-accent)] flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.3)] relative">
                      <div className="absolute inset-0 rounded-full border border-[var(--color-accent)] animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                      {(() => {
                        const CenterIcon = getIcon(activeCategory);
                        return <CenterIcon className="w-10 h-10 text-[var(--color-accent)]" />;
                      })()}
                    </div>
                  </div>

                  {/* Orbit Rings */}
                  <div className="absolute w-[300px] h-[300px] border border-[var(--color-border)] rounded-full opacity-30 pointer-events-none" />
                  <div className="absolute w-[450px] h-[450px] border border-[var(--color-border)] border-dashed rounded-full opacity-20 pointer-events-none" />

                  {/* Skills Orbit Nodes */}
                  <div className="w-full h-full relative pointer-events-none" style={{ minHeight: '500px' }}>
                    {activeGroup && activeGroup.skills.map((skill, index) => {
                      const total = activeGroup.skills.length;
                      const ring = total > 8 ? (index % 2 === 0 ? 1 : 2) : 1.5; 
                      const radius = ring === 1 ? 150 : ring === 2 ? 225 : 180;
                      
                      const angle = (index / total) * Math.PI * 2 - (Math.PI / 2);
                      const x = `calc(50% + ${Math.cos(angle) * radius}px)`;
                      const y = `calc(50% + ${Math.sin(angle) * radius}px)`;

                      const isHovered = hoveredSkill === skill.id;

                      return (
                        <motion.div
                          key={skill.id}
                          className="absolute z-30 pointer-events-auto"
                          style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.2, type: 'spring' }}
                          onMouseEnter={() => setHoveredSkill(skill.id)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div className={`relative group cursor-crosshair transition-all duration-300 ${isHovered ? 'scale-125 z-50' : 'scale-100'}`}>
                            
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 backdrop-blur-md ${
                              isHovered 
                                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] shadow-[0_0_20px_rgba(255,122,0,0.5)]' 
                                : 'bg-[var(--color-surface)]/80 border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-elevated)]'
                            }`}>
                              <Code className={`w-6 h-6 ${isHovered ? 'text-white' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]'}`} />
                            </div>

                            {/* Label */}
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                              <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] px-4 py-2 rounded-lg shadow-xl flex flex-col items-center">
                                <span className="font-bold text-[var(--color-text-primary)]">{skill.name}</span>
                                {skill.level && <span className="text-xs text-[var(--color-accent)] mt-1 font-mono">{skill.level}</span>}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
              </div>

              {/* Mobile: Interactive Stacked Cards */}
              <div className="flex flex-col gap-3 w-full lg:hidden mt-2">
                <AnimatePresence mode="popLayout">
                  {activeGroup && activeGroup.skills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/5 to-transparent opacity-0 group-active:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center">
                          <Code className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <span className="font-semibold text-[var(--color-text-primary)]">{skill.name}</span>
                      </div>
                      {skill.level && (
                        <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] px-2.5 py-1 rounded-md font-mono relative z-10">
                          {skill.level}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
