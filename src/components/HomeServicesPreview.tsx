import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import personalCare from "@/assets/service-personal-care.jpg";
import homemaking from "@/assets/service-homemaking.jpg";
import companion from "@/assets/service-companion.jpg";

const services = [
  {
    title: "Personal Assistance",
    description:
      "Compassionate, hands-on support with bathing, dressing, grooming, mobility, and medication reminders — preserving dignity in every detail.",
    image: personalCare,
    alt: "Caregiver assisting an elderly woman",
  },
  {
    title: "Homemaking Care",
    description:
      "Light housekeeping, meal preparation, laundry and errands — keeping your loved one's home safe, clean and comfortable, 24/7.",
    image: homemaking,
    alt: "Caregiver preparing a fresh meal in a sunny kitchen",
  },
  {
    title: "Companion Care",
    description:
      "Friendly conversation, walks, games, appointment escorts and meaningful connection that brightens every day.",
    image: companion,
    alt: "Caregiver and senior man enjoying tea together",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomeServicesPreview = () => {
  return (
    <section className="py-20 lg:py-28 bg-warm">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4 leading-tight">
            Our Home Care Services
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            A full spectrum of compassionate home health services tailored to each
            individual's unique needs and lifestyle.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={item}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/0 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading text-xl font-semibold text-card-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed text-sm mb-5 flex-1">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm hover:gap-2.5 transition-all"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-7 py-3.5 text-base font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25"
          >
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesPreview;
