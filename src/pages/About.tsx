import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import MissionVisionValues from "@/components/MissionVisionValues";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
          About Empire Home Care
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Compassionate care, built on trust — every step of the way.
        </p>
      </div>
    </section>

    <AboutSection />
    <MissionVisionValues />
    <Footer />
  </div>
);

export default About;
