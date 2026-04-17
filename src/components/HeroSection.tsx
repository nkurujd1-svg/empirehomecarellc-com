import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroFallback from "@/assets/hero-care.jpg";
import { useHeroSlides } from "@/hooks/useSiteData";

const HeroSection = () => {
  const { data: slides, loading } = useHeroSlides();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[index];
  const image = slide?.image_url || heroFallback;
  const title = slide?.title || "Compassionate Care,";
  const accent = slide?.title_accent || "Right at Home";
  const description =
    slide?.description ||
    "Empire Home Care LLC provides personalized, professional home health services that empower your loved ones to live with dignity, comfort, and independence.";
  const badge = slide?.badge_text || "Trusted Home Health Care";
  const primaryLabel = slide?.primary_cta_label || "Get Started";
  const primaryUrl = slide?.primary_cta_url || "/contact";
  const secondaryLabel = slide?.secondary_cta_label || "Our Services";
  const secondaryUrl = slide?.secondary_cta_url || "/services";

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={slide?.id || "fallback"}
            src={image}
            alt={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(210 55% 18% / 0.88), hsl(174 55% 35% / 0.65))",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-28 pb-20">
        <motion.div
          key={slide?.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-4 py-1.5 mb-6">
            <Heart className="h-4 w-4 text-secondary-foreground" />
            <span className="text-sm font-medium text-secondary-foreground/90">{badge}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-6">
            {title}{" "}
            {accent && <span className="text-secondary-foreground italic">{accent}</span>}
          </h1>

          <p className="text-lg text-primary-foreground/80 font-body leading-relaxed mb-8 max-w-lg">
            {description}
          </p>

          <div className="flex flex-wrap gap-4">
            {primaryLabel && (
              <Link
                to={primaryUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-7 py-3.5 text-base font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25"
              >
                {primaryLabel}
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
            {secondaryLabel && (
              <Link
                to={secondaryUrl}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      {/* Carousel controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-secondary" : "w-2 bg-primary-foreground/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
