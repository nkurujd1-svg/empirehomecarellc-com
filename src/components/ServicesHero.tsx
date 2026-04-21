import { motion } from "framer-motion";
import servicesHero from "@/assets/services-hero.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const ServicesHero = () => {
  const { data } = useSiteContent("services", {
    eyebrow: "Our Services",
    hero_heading: "Compassionate Care, Right at Home",
    hero_subheading:
      "Personalized home health services designed to support independence, comfort, and dignity for every individual we serve.",
  });

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      <img
        src={servicesHero}
        alt="Compassionate caregiver assisting an elderly woman at home"
        width={1920}
        height={900}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-background"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
            {data.eyebrow}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5 leading-tight">
            {data.hero_heading}
          </h1>
          <p className="font-body text-lg text-background/90 leading-relaxed max-w-xl">
            {data.hero_subheading}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
