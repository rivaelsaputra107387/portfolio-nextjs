import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { PhotoProvider } from "@/components/providers/PhotoProvider";

export default function Home() {
  return (
    <>
      <Navbar />
      <PhotoProvider>
        <main>
          <Hero />
          <Services />
          <ProjectShowcase />
          <Testimonials />
          <About />
          <Contact />
        </main>
      </PhotoProvider>
      <Footer />
    </>
  );
}
