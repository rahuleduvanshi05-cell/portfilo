import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PipelineSection from "./components/PipelineSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <PipelineSection />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
