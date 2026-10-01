import { motion } from 'framer-motion';

const AboutBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none transition-colors duration-300">
      {/* Base Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      {/* Layer 1: Slow Parallax Gradient */}
      <motion.div 
        animate={{ y: [0, -30, 0] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/10 via-transparent to-transparent rounded-full blur-[80px]"
      />
      
      {/* Layer 2: Geometric Shapes Parallax */}
      <motion.div 
        animate={{ y: [0, 40, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[10%] w-64 h-64 border border-white/5 rounded-full"
      />
      
      <motion.div 
        animate={{ y: [0, -50, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[20%] w-96 h-96 border border-orange-500/5 rounded-full"
      />
      
      {/* Layer 3: Faint Technical Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_40px] opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      
      {/* Soft Ambient Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/[0.02] to-transparent" />
    </div>
  );
};

export default AboutBackground;
