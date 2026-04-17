import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const values = [
  "Personalized care plans for every client",
  "Licensed & insured caregivers",
  "Available 24 hours a day, 7 days a week",
  "Culturally sensitive and respectful care",
  "Regular communication with families",
  "Ongoing caregiver training & supervision",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
              About Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
              Caring for Your Family{" "}
              <span className="text-secondary">Like Our Own</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              At Empire Home Care LLC, we believe that everyone deserves high-quality,
              compassionate care in the comfort of their own home. Our team of dedicated
              professionals is committed to enhancing the quality of life for seniors and
              individuals with special needs.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              At Empire Home Care, we are dedicated to providing compassionate, high-quality
              care that allows individuals to remain safe, comfortable, and independent in
              the place they call home. We understand that every client has unique needs,
              which is why we offer personalized care plans tailored to support each
              individual's lifestyle, health, and well-being.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Founded on the principles of empathy, integrity, and excellence, we go
              beyond the basics to create meaningful connections with every client we serve.
            </p>

            <ul className="space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80 font-body text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-secondary/10 rounded-2xl p-10 border border-secondary/20">
              <div className="text-center p-6 bg-card rounded-xl shadow-sm">
                <p className="text-5xl font-heading font-bold text-secondary">98%</p>
                <p className="text-sm text-muted-foreground font-body mt-2">Client Retention</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
