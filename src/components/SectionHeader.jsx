const SectionHeader = ({ label, title1, title2 }) => (
  <div className="flex flex-col items-center justify-center text-center mb-16">
    <p className="text-[var(--color-accent)] font-bold tracking-[0.2em] uppercase text-sm mb-3 font-mono">{label}</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[var(--color-accent)]/50 hidden md:block" />
      <h2 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-bold text-[var(--color-text-primary)] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
        {title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-orange-400">{title2}</span>
      </h2>
      <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[var(--color-accent)]/50 hidden md:block" />
    </div>
  </div>
);

export default SectionHeader;
