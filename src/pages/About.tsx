import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import MissionVisionValues from "@/components/MissionVisionValues";
import Footer from "@/components/Footer";
import oceanImage from "@/assets/ocean.jpg";

const About = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 text-center relative z-10 mb-10">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
          About Empire Home Care
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Compassionate care, built on trust — every step of the way.
        </p>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[260px] sm:h-[360px] md:h-[440px]">
          <div className="absolute inset-0 flex w-[200%] animate-marquee-x will-change-transform min-w-[200%]">
            <img
              src={oceanImage}
              alt="Calm ocean at golden hour"
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
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>

    <AboutSection />
    <MissionVisionValues />
    <Footer />
  </div>
);

export default About;
