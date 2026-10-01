import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Code2, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import InteractiveBackground from '../components/InteractiveBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const Home = () => {
  return (
    <div 
      className="min-h-[100svh] min-h-[100dvh] flex flex-col justify-center relative overflow-hidden selection:bg-[var(--color-accent)] selection:text-[var(--color-text-primary)] w-full"
      style={{ paddingTop: 'calc(var(--header-height, 60px) + env(safe-area-inset-top))', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <InteractiveBackground theme="home" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-grow flex items-center justify-center">
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Text & Intro */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-last lg:order-first mt-4 lg:mt-0"
          >
            <motion.div variants={itemVariants} className="overflow-hidden mb-4">
              <p className="text-[var(--color-accent)] font-semibold tracking-[0.2em] text-sm uppercase">
                Hello, It's Me
              </p>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-[clamp(2.5rem,6vw+1rem,5rem)] xl:text-[6rem] font-extrabold text-[var(--color-text-primary)] leading-[1.05] tracking-tighter mb-4 lg:mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Vasanthala <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-orange-300 drop-shadow-[0_0_15px_rgba(255,122,0,0.3)]">
                Rekha Rani
              </span>
            </motion.h1>
            
            <motion.div 
              variants={itemVariants}
              className="text-[clamp(1.25rem,2vw+0.5rem,1.75rem)] text-[var(--text-primary)] font-medium mb-6 flex items-center gap-2"
            >
              <span className="opacity-70">I am an</span> <span className="text-[var(--color-accent)] font-bold drop-shadow-sm ml-1">
                <TypeAnimation
                  sequence={[
                    'AI & Data Engineer', 2500,
                    'Software Developer', 2500,
                    'Problem Solver', 2500,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />
              </span>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-[clamp(0.85rem,1.2vw+0.5rem,1.1rem)] text-[var(--color-text-muted)] max-w-xl leading-relaxed mb-6 lg:mb-8 font-light"
            >
              <strong className="text-[var(--text-primary)] font-semibold hidden md:inline">Building modern web applications and intelligent data solutions. </strong>
              I am passionate about creating sophisticated digital ecosystems, leveraging artificial intelligence, and engineering high-performance software.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Link 
                to="/projects"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-accent)] text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:bg-[var(--color-accent)] hover:shadow-[0_0_25px_rgba(255,122,0,0.4)] active:scale-95"
              >
                <span className="relative z-10">Explore Work</span>
                <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
              
              <a 
                href="/resume.pdf"
                target="_blank"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-full font-medium hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-300 active:scale-95"
              >
                <span>Resume</span>
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300 text-[var(--color-accent)]" />
              </a>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-6 lg:mt-12 flex items-center justify-center lg:justify-start gap-4 lg:gap-5"
            >
              <SocialIcon href="https://github.com/VasanthalaRekhaRani" icon={<Code2 className="w-4 h-4 lg:w-5 lg:h-5" />} />
              <SocialIcon href="https://linkedin.com/in/rekha-vasanthala" icon={<Globe className="w-4 h-4 lg:w-5 lg:h-5" />} />
              <SocialIcon href="mailto:vasanthalarekha12@gmail.com" icon={<Mail className="w-4 h-4 lg:w-5 lg:h-5" />} />
            </motion.div>
          </motion.div>

          {/* Right Column: Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center perspective-1000 order-first lg:order-last"
          >
            {/* Interactive Orbit System */}
            <div className="relative w-[clamp(160px,42vw,220px)] h-[clamp(160px,42vw,220px)] md:w-[clamp(220px,30vw,280px)] md:h-[clamp(220px,30vw,280px)] lg:w-[clamp(300px,30vw,480px)] lg:h-[clamp(300px,30vw,480px)] flex items-center justify-center">
              
              {/* Outer dashed ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[var(--border-color-light)] border-dashed opacity-50"
              />

              {/* Middle thin ring with glowing node */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[8%] rounded-full border border-[var(--border-color)] opacity-30"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-[var(--color-accent)] rounded-full shadow-[0_0_15px_var(--color-accent)] -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              {/* Inner subtle glow */}
              <div className="absolute inset-[15%] rounded-full bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent blur-3xl opacity-50 pointer-events-none" />

              {/* Profile Image Container */}
              <motion.div 
                whileHover={{ scale: 1.03, rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 w-[70%] h-[70%] rounded-full p-2 bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-bg)] shadow-[0_0_50px_rgba(255,122,0,0.15)] group"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-[var(--color-bg)]">
                  <img 
                    src="/profile.jpg" 
                    alt="Vasanthala Rekha Rani"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
                    }}
                    draggable={false}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ href, icon }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    whileHover={{ y: -4, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-11 h-11 rounded-full bg-[var(--surface)] border border-[var(--border-color-light)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/10 hover:shadow-[0_0_15px_rgba(255,122,0,0.2)] transition-all duration-300"
  >
    {icon}
  </motion.a>
);

export default Home;
