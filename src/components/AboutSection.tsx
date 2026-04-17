import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useAboutContent } from "@/hooks/useSiteData";

const AboutSection = () => {
  const { data } = useAboutContent();
  const heading = data?.about_heading || "Caring for Your Family";
  const accent = data?.about_heading_accent || "Like Our Own";
  const p1 = data?.about_paragraph_1 || "";
  const p2 = data?.about_paragraph_2 || "";
  const p3 = data?.about_paragraph_3 || "";
  const values = (data?.about_values as string[] | null) ?? [];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
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
              {heading} {accent && <span className="text-secondary">{accent}</span>}
            </h2>
            {p1 && <p className="text-muted-foreground font-body leading-relaxed mb-6">{p1}</p>}
            {p2 && <p className="text-muted-foreground font-body leading-relaxed mb-6">{p2}</p>}
            {p3 && <p className="text-muted-foreground font-body leading-relaxed mb-8">{p3}</p>}

            {values.length > 0 && (
              <ul className="space-y-3">
                {values.map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-body text-sm">{v}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
