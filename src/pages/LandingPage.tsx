import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Services from '../components/Services';
import WhyChooseMe from '../components/WhyChooseMe';
import Testimonials from '../components/Testimonials';
import WorkProcess from '../components/WorkProcess';
import TechStack from '../components/TechStack';
import Statistics from '../components/Statistics';
import Contact from '../components/Contact';
import ThreeScene from '../components/ThreeScene';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-neutral-900 dark:text-white selection:bg-orange-500 selection:text-black overflow-x-hidden transition-colors duration-300">
      <ThreeScene />
      
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. About Section */}
      <About />
      
      {/* 10. Statistics Section (Placed here for early impact) */}
      <Statistics />

      {/* 3. Featured Projects */}
      <FeaturedProjects />

      {/* 4. Skills Section */}
      <Skills />

      {/* 9. Tech Stack Section */}
      <TechStack />

      {/* 5. Services Section */}
      <Services />

      {/* 6. Why Choose Me */}
      <WhyChooseMe />

      {/* 8. Work Process */}
      <WorkProcess />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 11. Contact Section */}
      <Contact />
    </div>
  );
}
