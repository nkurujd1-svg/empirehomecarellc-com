import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteData";

const generatePuzzle = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  const answer = op === "+" ? a + b : op === "-" ? a - b : a * b;
  return { a, b, op, answer };
};

const ContactSection = () => {
  const { data: settings } = useSiteSettings();
  const [formData, setFormData] = useState({ full_name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [puzzle, setPuzzle] = useState(generatePuzzle);
  const [puzzleAnswer, setPuzzleAnswer] = useState("");

  const refreshPuzzle = () => {
    setPuzzle(generatePuzzle());
    setPuzzleAnswer("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(puzzleAnswer, 10) !== puzzle.answer) {
      toast({ title: "Incorrect answer", description: "Please solve the math puzzle correctly.", variant: "destructive" });
      refreshPuzzle();
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert(formData);
    if (error) {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Sent!", description: "We'll get back to you soon." });
      setFormData({ full_name: "", phone: "", email: "", message: "" });
      refreshPuzzle();
    }
    setSubmitting(false);
  };

  const contacts = [
    settings?.phone && {
      icon: Phone,
      label: settings.phone,
      href: settings.phone_href || `tel:${settings.phone.replace(/[^+\d]/g, "")}`,
    },
    settings?.email && {
      icon: Mail,
      label: settings.email,
      href: `mailto:${settings.email}`,
    },
    settings?.address && {
      icon: MapPin,
      label: settings.address,
      href:
        settings.address_map_url ||
        `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`,
    },
  ].filter(Boolean) as { icon: typeof Phone; label: string; href: string }[];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary font-body">
              Get In Touch
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
              Ready to Start <span className="text-secondary">Caring?</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-10">
              Contact us today for a free consultation. We'll work with you to create a
              personalized care plan that meets your family's unique needs.
            </p>

            <div className="space-y-6">
              {contacts.map((c) => (
                <a key={c.label} href={c.href} className="flex items-center gap-4 group">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="text-foreground/80 font-body group-hover:text-secondary transition-colors">
                    {c.label}
                  </span>
                </a>
              ))}

              {settings?.opening_hours && (
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="font-body">
                    <p className="text-foreground font-semibold">Opening Hours</p>
                    <p className="text-foreground/80 text-sm mt-0.5 whitespace-pre-line">
                      {settings.opening_hours}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 shadow-sm border border-border space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Full Name</label>
                  <input type="text" required value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} placeholder="Your name" className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(123) 456-7890" className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Your email" className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">How Can We Help?</label>
                <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your care needs..." className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3.5 text-base font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors disabled:opacity-50">
                {submitting ? "Sending..." : "Request Free Consultation"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
