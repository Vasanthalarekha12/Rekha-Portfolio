import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import InteractiveBackground from '../components/InteractiveBackground';

const About = () => {
  const education = [
    {
      institution: "Aditya Engineering College",
      degree: "Bachelor of Engineering And Technology in Artificial Intelligence and Machine Learning",
      period: "2023 – 2027",
      gpa: "8.67/10.0",
      location: "Surampalem, India"
    },
    {
      institution: "Sri Chaitanya Junior College",
      degree: "Intermediate",
      period: "2021 – 2023",
      gpa: "8.10/10.0",
      location: "Kakinada, India"
    }
  ];

  // 3D Photo Float
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div className="w-full py-24 relative overflow-hidden">
      <InteractiveBackground theme="about" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ABOUT ME SECTION */}
        <SectionHeader label="GET TO KNOW ME" title1="About" title2="Me" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative cursor-crosshair perspective-1000 w-full max-w-md mx-auto"
          >
            {/* Geometric Frame */}
            <div 
              className="relative aspect-[4/5] w-full p-[2px] bg-gradient-to-tr from-[var(--color-bg)] via-[var(--color-border)] to-[var(--color-accent-soft)]"
              style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}
            >
              <div 
                className="w-full h-full bg-[var(--color-surface)] overflow-hidden relative"
                style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)', transform: 'translateZ(20px)' }}
              >
                <img 
                  src="/about-photo.jpg" 
                  alt="Vasanthala Rekha Rani" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-700"
                  style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
            {/* Tech Accents */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[var(--color-accent)] opacity-50 transform translate-z-30 pointer-events-none" style={{ transform: 'translateZ(40px)' }} />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-[var(--color-accent)] opacity-50 transform translate-z-30 pointer-events-none" style={{ transform: 'translateZ(40px)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[var(--color-accent)] to-transparent rounded-full blur-[80px] opacity-10 z-[-1]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <p className="text-xl leading-relaxed text-[var(--color-text-muted)] mb-6">
              I am a B.Tech student specializing in <span className="font-semibold text-[var(--color-accent)]">Artificial Intelligence</span> and <span className="font-semibold text-[var(--color-accent)]">Machine Learning</span> with a strong interest in software development and problem solving.
            </p>
            <p className="text-xl leading-relaxed text-[var(--color-text-muted)] mb-6">
              I enjoy building <span className="text-[var(--color-text-primary)] font-medium">scalable web applications</span>, backend systems, and real-world solutions that combine creativity with technology.
            </p>
            <p className="text-xl leading-relaxed text-[var(--color-text-muted)] mb-10">
              My goal is to create impactful digital solutions while continuously improving my skills in software engineering, AI, databases, and modern web development.
            </p>
            
            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-accent)] text-[var(--color-text-primary)] rounded-full font-medium overflow-hidden transition-all hover:bg-[var(--color-accent)] hover:shadow-[0_0_25px_rgba(255,122,0,0.4)] active:scale-95">
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>


        {/* EDUCATION SECTION */}
        <div className="mt-32">
          <SectionHeader label="MY JOURNEY" title1="My" title2="Education" />

          <div className="relative max-w-4xl mx-auto mt-16 before:absolute before:inset-0 before:ml-[28px] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[var(--color-accent)]/30 before:to-transparent">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={1}
                whileDrag={{ scale: 1.02, zIndex: 50, cursor: "grabbing" }}
                className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group mb-12 last:mb-0 cursor-grab`}
              >
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#08080D] bg-[#111118] text-[var(--color-accent)] shadow-[0_0_15px_rgba(255,122,0,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                  <Award className="w-6 h-6" />
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3.5rem)] premium-card p-8 group-hover:-translate-y-2 group-hover:border-[var(--color-accent)]/50 transition-all duration-300">
                  
                  <div className="flex flex-wrap gap-3 items-center mb-4">
                    <span className="text-[var(--color-accent)] font-bold tracking-wider text-sm">{edu.period}</span>
                    {index === 0 && (
                      <span className="px-3 py-1 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold rounded-full">CURRENT</span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-[var(--color-text-primary)] text-xl lg:text-2xl mb-2">{edu.institution}</h3>
                  <div className="text-[var(--color-text-muted)] font-medium mb-6">{edu.degree}</div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-[var(--color-text-muted)]">
                      <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)]">
                      <span>GPA: {edu.gpa}</span>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
