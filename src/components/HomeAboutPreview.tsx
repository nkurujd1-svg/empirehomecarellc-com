import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import aboutImg from "@/assets/about-preview.jpg";

const highlights = [
  "Personalized care plans",
  "Licensed & insured caregivers",
  "Available 24/7",
  "Culturally sensitive care",
];

const HomeAboutPreview = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aboutImg}
                alt="Caregiver holding hands with an elderly client"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-[420px] sm:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>
            {/* Floating badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-card border border-border shadow-xl rounded-2xl p-5 max-w-[220px] items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading font-bold text-2xl text-foreground leading-none">10+</p>
                <p className="text-xs text-muted-foreground mt-1">Years caring for families</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
              About Empire Home Care
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6 leading-tight">
              Caring for Your Family{" "}
              <span className="text-secondary italic">Like Our Own</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-5">
              At Empire Home Care LLC, we believe everyone deserves high-quality, compassionate
              care in the comfort of their own home. Our dedicated professionals are committed
              to enhancing the quality of life for seniors and individuals with special needs.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Founded on empathy, integrity, and excellence, we go beyond the basics to create
              meaningful connections with every client we serve.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80 font-body text-sm">{h}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Learn More About Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutPreview;
