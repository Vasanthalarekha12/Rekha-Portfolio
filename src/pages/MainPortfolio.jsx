import { useEffect } from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Certifications from './Certifications';
import Contact from './Contact';
import { useLocation } from 'react-router-dom';
import RevealSection from '../components/RevealSection';

const MainPortfolio = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [hash]);

  return (
    <div className="flex flex-col">
      <RevealSection id="home">
        <Home />
      </RevealSection>
      <RevealSection id="about">
        <About />
      </RevealSection>
      <RevealSection id="projects">
        <Projects />
      </RevealSection>
      <RevealSection id="skills">
        <Skills />
      </RevealSection>
      <RevealSection id="certifications">
        <Certifications />
      </RevealSection>
      <RevealSection id="contact">
        <Contact />
      </RevealSection>
    </div>
  );
};

export default MainPortfolio;
