import { useEffect } from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Certifications from './Certifications';
import Contact from './Contact';
import { useLocation } from 'react-router-dom';

const MainPortfolio = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="flex flex-col">
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="certifications">
        <Certifications />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default MainPortfolio;
