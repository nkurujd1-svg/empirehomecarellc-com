import { motion } from "framer-motion";
import { Heart, Home, Users } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Personal Care",
    description: "Assistance with bathing, grooming, dressing, and daily hygiene to maintain comfort and dignity.",
  },
  {
    icon: Home,
    title: "Homemaker Services",
    description: "Light housekeeping, meal preparation, and laundry to keep your home clean and comfortable.",
  },
  {
    icon: Users,
    title: "Companion Care",
    description: "Meaningful companionship, conversation, and social engagement to reduce isolation.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
            Our Home Care Services
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            We provide a full spectrum of home health services tailored to each individual's
            unique needs, ensuring the highest quality of life.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-lg hover:border-secondary/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-secondary/10 text-secondary mb-5 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
