import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import aboutFallback from "@/assets/about-ocean.jpg";
import { useAboutContent } from "@/hooks/useSiteData";

const HomeAboutPreview = () => {
  const { data } = useAboutContent();
  const image = data?.preview_image_url || aboutFallback;
  const heading = data?.preview_heading || "Caring for Your Family";
  const accent = data?.preview_heading_accent || "Like Our Own";
  const p1 = data?.preview_paragraph_1 || "";
  const p2 = data?.preview_paragraph_2 || "";
  const highlights = (data?.preview_highlights as string[] | null) ?? [];
  const badgeValue = data?.preview_badge_value || "10+";
  const badgeLabel = data?.preview_badge_label || "Years caring for families";

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[420px] sm:h-[520px]">
              <div className="absolute inset-0 flex w-[200%] animate-marquee-x will-change-transform min-w-[200%]">
                <img
                  src={image}
                  alt={heading}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-1/2 object-cover shrink-0"
                />
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-1/2 object-cover shrink-0"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

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
              {heading}{" "}
              {accent && <span className="text-secondary italic">{accent}</span>}
            </h2>
            {p1 && <p className="text-muted-foreground font-body leading-relaxed mb-5">{p1}</p>}
            {p2 && <p className="text-muted-foreground font-body leading-relaxed mb-8">{p2}</p>}

            {highlights.length > 0 && (
              <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-body text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            )}

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
