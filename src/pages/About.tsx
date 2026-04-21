import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import BrochureDownload from "@/components/BrochureDownload";
import MissionVisionValues from "@/components/MissionVisionValues";
import Footer from "@/components/Footer";
import oceanImage from "@/assets/ocean.jpg";
import brochureCover from "@/assets/brochure/cover-preview.png";
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

    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border bg-muted">
            <img
              src={brochureCover}
              alt="Empire Home Care brochure cover preview"
              width={1600}
              height={2070}
              loading="lazy"
              className="w-full h-auto block"
            />
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
              Preview
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
              Take a peek at our brochure
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              See what's inside before you download — our services, philosophy,
              and what makes Empire Home Care a trusted partner for your family.
            </p>
          </div>
        </div>
      </div>
    </section>

    <BrochureDownload />
    <MissionVisionValues />
    <Footer />
  </div>
  );
};

export default About;
