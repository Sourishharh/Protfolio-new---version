import ParticleBackground from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "hsl(222, 47%, 6%)" }}>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
