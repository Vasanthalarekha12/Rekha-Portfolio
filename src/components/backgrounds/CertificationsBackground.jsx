import { useEffect, useRef } from 'react';

const CertificationsBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let points = [];
    
    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    class CircuitPoint {
      constructor() {
        this.x = Math.floor(Math.random() * (canvas.width / 40)) * 40;
        this.y = Math.floor(Math.random() * (canvas.height / 40)) * 40;
        this.size = Math.random() > 0.5 ? 2 : 4;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.blinkSpeed = Math.random() * 0.02 + 0.01;
      }
      
      update() {
        this.opacity += this.blinkSpeed;
        if (this.opacity > 0.8 || this.opacity < 0.2) {
          this.blinkSpeed *= -1;
        }
        
        ctx.fillStyle = `rgba(255, 122, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        if (this.size > 2) {
          ctx.strokeStyle = `rgba(255, 122, 0, ${this.opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
    
    const init = () => {
      initCanvas();
      points = [];
      const numPoints = window.innerWidth < 768 ? 20 : 60;
      for (let i = 0; i < numPoints; i++) {
        points.push(new CircuitPoint());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      points.forEach(p => p.update());
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none transition-colors duration-300">
      {/* Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-accent) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Circuit lines decorative SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M 10 10 L 50 10 L 70 30 L 130 30 L 150 10 L 190 10" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <path d="M 10 190 L 50 190 L 70 170 L 130 170 L 150 190 L 190 190" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <circle cx="50" cy="10" r="2" fill="var(--color-accent)" />
          <circle cx="150" cy="10" r="2" fill="var(--color-accent)" />
          <circle cx="50" cy="190" r="2" fill="var(--color-accent)" />
          <circle cx="150" cy="190" r="2" fill="var(--color-accent)" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-bg)_80%)]" />
    </div>
  );
};

export default CertificationsBackground;
