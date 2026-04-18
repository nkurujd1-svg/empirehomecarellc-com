import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import MissionVisionValues from "@/components/MissionVisionValues";
import Footer from "@/components/Footer";
import oceanBg from "@/assets/about-ocean.jpg";

const About = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero with ocean marquee pan */}
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex h-full w-[200%] animate-marquee-x will-change-transform min-w-[200vw]">
          <img
            src={oceanBg}
            alt="Calm ocean at golden hour"
            width={1920}
            height={1080}
            className="h-full w-1/2 object-cover shrink-0"
          />
          <img
            src={oceanBg}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            className="h-full w-1/2 object-cover shrink-0"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/55 via-sky-900/30 to-sky-950/65" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          About Empire Home Care
        </h1>
        <p className="font-body text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
          Compassionate care, built on trust — flowing with you, every step of the way.
        </p>
      </div>
    </section>

    <AboutSection />
    <MissionVisionValues />
    <Footer />
  </div>
);

export default About;
