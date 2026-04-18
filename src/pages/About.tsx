import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import MissionVisionValues from "@/components/MissionVisionValues";
import Footer from "@/components/Footer";
import oceanImage from "@/assets/ocean.jpg";

const About = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[320px] sm:h-[420px] md:h-[520px]">
          <div className="absolute inset-0 flex w-[200%] animate-marquee-x will-change-transform min-w-[200%]">
            <img
              src={oceanImage}
              alt="Calm turquoise ocean"
              width={1920}
              height={1024}
              loading="lazy"
              className="h-full w-1/2 object-cover shrink-0"
            />
            <img
              src={oceanImage}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1024}
              loading="lazy"
              className="h-full w-1/2 object-cover shrink-0"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-primary/40 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] mb-4">
              About Empire Home Care
            </h1>
            <p className="font-body text-lg md:text-xl text-white/95 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              Compassionate care, built on trust — every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>

    <AboutSection />
    <MissionVisionValues />
    <Footer />
  </div>
);

export default About;
