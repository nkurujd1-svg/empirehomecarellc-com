import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteData";

const PAGES = [
  "https://tyrpfkdbzpqjyxkchism.supabase.co/storage/v1/object/public/site-assets/misc/brochure-v13-page-1.jpg",
  "https://tyrpfkdbzpqjyxkchism.supabase.co/storage/v1/object/public/site-assets/misc/brochure-v13-page-2.jpg",
];

const BrochurePreview = () => {
  const { data: settings } = useSiteSettings();
  const url = settings?.brochure_url;
  const label = settings?.brochure_label || "Download Brochure";
  const visible = settings?.brochure_visible ?? true;

  if (!visible || !url) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">
            Our Brochure
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Take a Look Inside
          </h2>
          <p className="text-muted-foreground font-body">
            Preview both pages of our brochure below, or download the full PDF.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {PAGES.map((src, i) => (
            <motion.a
              key={src}
              href={url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group block rounded-xl overflow-hidden border bg-card shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative aspect-[11/8.5] overflow-hidden bg-muted">
                <img
                  src={src}
                  alt={`Brochure page ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
                  Page {i + 1}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a
            href={url}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-7 py-3.5 font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-md"
          >
            <Download className="h-5 w-5" />
            {label}
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrochurePreview;
