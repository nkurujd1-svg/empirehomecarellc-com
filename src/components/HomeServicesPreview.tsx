import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useServices } from "@/hooks/useSiteData";
import { getIcon } from "@/lib/iconMap";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomeServicesPreview = () => {
  const { data: services } = useServices({ featuredOnly: true });

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
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.article
                key={service.id}
                variants={item}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-secondary/10 text-secondary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-card-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm mb-5 flex-1">
                    {service.short_description}
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
            );
          })}
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
