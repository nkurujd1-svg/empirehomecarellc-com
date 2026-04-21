import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteData";

const BrochureDownload = () => {
  const { data: settings } = useSiteSettings();
  const url = settings?.brochure_url;
  const label = settings?.brochure_label || "Download Brochure";
  const visible = settings?.brochure_visible ?? true;

  if (!visible || !url) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto rounded-2xl border bg-card p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
        >
          <div className="flex-shrink-0 h-16 w-16 rounded-full bg-secondary/15 flex items-center justify-center">
            <FileText className="h-8 w-8 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
              Get Our Brochure
            </h3>
            <p className="text-muted-foreground font-body">
              Learn more about our services, team, and care philosophy in one easy PDF.
            </p>
          </div>
          <a
            href={url}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-md"
          >
            <Download className="h-5 w-5" />
            {label}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BrochureDownload;
