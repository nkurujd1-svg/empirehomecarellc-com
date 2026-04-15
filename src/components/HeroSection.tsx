import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-care.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Compassionate home care"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(210 55% 18% / 0.88), hsl(174 55% 35% / 0.65))" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-4 py-1.5 mb-6">
            <Heart className="h-4 w-4 text-secondary-foreground" />
            <span className="text-sm font-medium text-secondary-foreground/90">Trusted Home Health Care</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-6">
            Compassionate Care,{" "}
            <span className="text-secondary-foreground italic">Right at Home</span>
          </h1>

          <p className="text-lg text-primary-foreground/80 font-body leading-relaxed mb-8 max-w-lg">
            Empire Home Care LLC provides personalized, professional home health services
            that empower your loved ones to live with dignity, comfort, and independence.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-7 py-3.5 text-base font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "10+", label: "Years of Experience" },
            { value: "500+", label: "Families Served" },
            { value: "24/7", label: "Care Available" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-heading font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
