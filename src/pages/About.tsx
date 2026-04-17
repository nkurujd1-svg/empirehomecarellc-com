import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import MissionVisionValues from "@/components/MissionVisionValues";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <AboutSection />
      <MissionVisionValues />
    </div>
    <Footer />
  </div>
);

export default About;
