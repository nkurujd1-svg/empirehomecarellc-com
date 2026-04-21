import { useState } from "react";
import { motion } from "framer-motion";
import { Download, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSiteSettings } from "@/hooks/useSiteData";

const PAGES = [
  "https://tyrpfkdbzpqjyxkchism.supabase.co/storage/v1/object/public/site-assets/misc/brochure-v7-page-1.jpg",
  "https://tyrpfkdbzpqjyxkchism.supabase.co/storage/v1/object/public/site-assets/misc/brochure-v7-page-2.jpg",
  "https://tyrpfkdbzpqjyxkchism.supabase.co/storage/v1/object/public/site-assets/misc/brochure-v7-page-3.jpg",
  "https://tyrpfkdbzpqjyxkchism.supabase.co/storage/v1/object/public/site-assets/misc/brochure-v7-page-4.jpg",
];

const ZOOM_STEPS = [1, 1.5, 2, 3];

const BrochurePreview = () => {
  const { data: settings } = useSiteSettings();
  const url = settings?.brochure_url;
  const label = settings?.brochure_label || "Download Brochure";
  const visible = settings?.brochure_visible ?? true;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomIdx, setZoomIdx] = useState(0);

  if (!visible || !url) return null;

  const closeLightbox = () => {
    setOpenIndex(null);
    setZoomIdx(0);
  };
  const zoomIn = () => setZoomIdx((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
  const zoomOut = () => setZoomIdx((i) => Math.max(i - 1, 0));
  const resetZoom = () => setZoomIdx(0);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">
            Our Brochure
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Take a Look Inside
          </h2>
          <p className="text-muted-foreground font-body">
            Browse all 4 pages of our brochure below. Tap any page to zoom in, or download the full PDF.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {PAGES.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => {
                setOpenIndex(i);
                setZoomIdx(0);
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              aria-label={`Open page ${i + 1} in zoom view`}
              className="group relative block rounded-xl overflow-hidden border bg-card shadow-lg hover:shadow-2xl transition-all text-left"
            >
              <img
                src={src}
                alt={`Brochure page ${i + 1}`}
                loading="lazy"
                className="block w-full h-auto"
              />
              <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
                Page {i + 1}
              </div>
              <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="h-3.5 w-3.5" />
                Click to zoom
              </div>
            </motion.button>
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

      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && closeLightbox()}>
        <DialogContent
          className="max-w-[100vw] sm:max-w-[95vw] w-[100vw] sm:w-[95vw] h-[100vh] sm:h-[95vh] p-0 bg-background/95 backdrop-blur border-0 sm:rounded-xl overflow-hidden [&>button]:hidden"
        >
          {openIndex !== null && (
            <div className="relative flex flex-col w-full h-full">
              <div className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-background/80 backdrop-blur">
                <span className="text-sm font-semibold text-foreground">
                  Page {openIndex + 1} of {PAGES.length}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={zoomIdx === 0}
                    aria-label="Zoom out"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed text-foreground"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={resetZoom}
                    aria-label="Reset zoom"
                    className="inline-flex h-9 min-w-[3.5rem] items-center justify-center rounded-md hover:bg-muted text-xs font-semibold text-foreground"
                  >
                    {Math.round(ZOOM_STEPS[zoomIdx] * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={zoomIdx === ZOOM_STEPS.length - 1}
                    aria-label="Zoom in"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed text-foreground"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    aria-label="Close"
                    className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto bg-muted/40">
                <div className="min-h-full flex items-start justify-center p-4">
                  <img
                    src={PAGES[openIndex]}
                    alt={`Brochure page ${openIndex + 1} (zoomed)`}
                    style={{ width: `${ZOOM_STEPS[zoomIdx] * 100}%`, maxWidth: "none" }}
                    className="h-auto select-none rounded-md shadow-xl transition-[width] duration-200"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BrochurePreview;
