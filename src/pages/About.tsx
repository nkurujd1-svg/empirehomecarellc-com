import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import BrochureDownload from "@/components/BrochureDownload";
import MissionVisionValues from "@/components/MissionVisionValues";
import Footer from "@/components/Footer";
import oceanImage from "@/assets/ocean.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const About = () => {
  const { data } = useSiteContent("about", {
    hero_heading: "About Empire Home Care",
    hero_subheading: "Compassionate care, built on trust — every step of the way.",
  });

  return (
  <div className="min-h-screen">
    <Navbar />

    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[320px] sm:h-[420px] md:h-[520px]">
          <img
            src={oceanImage}
            alt="Calm turquoise ocean"
            width={1920}
            height={1024}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-primary/40 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] mb-4">
              {data.hero_heading}
            </h1>
            <p className="font-body text-lg md:text-xl text-white/95 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {data.hero_subheading}
            </p>
          </div>
        </div>
      </div>
    </section>

    <AboutSection />
    <BrochureDownload />
    <MissionVisionValues />
    <Footer />
  </div>
  );
};

export default About;
