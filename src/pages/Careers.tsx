import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Upload, FileText, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCareersContent } from "@/hooks/useSiteData";
import { getIcon } from "@/lib/iconMap";

type Perk = { icon: string; title: string; text: string };

const FALLBACK_PERKS: Perk[] = [
  { icon: "Heart", title: "Meaningful Work", text: "Make a real difference in clients' lives every day." },
  { icon: "Users", title: "Supportive Team", text: "Join a caring, professional, and welcoming team." },
  { icon: "Briefcase", title: "Competitive Pay", text: "Fair wages, flexible schedules, and growth opportunities." },
];

const Careers = () => {
  const { data: content } = useCareersContent();
  const perks: Perk[] = (content?.perks as unknown as Perk[]) ?? FALLBACK_PERKS;
  const heroHeading = content?.hero_heading || "Join Our Caring Team";
  const heroSub = content?.hero_subheading || "Build a rewarding career with Empire Home Care LLC — where compassion meets opportunity.";
  const formHeading = content?.form_heading || "Apply Now";
  const formDescription = content?.form_description || "Send us your details, attach your resume, and tell us a bit about yourself.";

  const [form, setForm] = useState({ full_name: "", email: "", phone: "", position: "", message: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFile = (file: File | null) => {
    if (!file) return setResume(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload a PDF or Word document.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Resume must be under 10MB.");
      return;
    }
    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let resume_url: string | null = null;
    if (resume) {
      const ext = resume.name.split(".").pop();
      const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("resumes").upload(path, resume, {
        contentType: resume.type,
        upsert: false,
      });
      if (upErr) {
        setLoading(false);
        toast.error("Could not upload resume. Please try again.");
        return;
      }
      resume_url = path;
    }

    const { error } = await supabase.from("contact_submissions").insert({
      full_name: form.full_name,
      email: form.email || null,
      phone: form.phone || null,
      message: `[CAREER APPLICATION${form.position ? ` — ${form.position}` : ""}] ${form.message}`,
      resume_url,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("Application submitted! We'll be in touch soon.");
      setForm({ full_name: "", email: "", phone: "", position: "", message: "" });
      setResume(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4"
          >
            {heroHeading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {heroSub}
          </motion.p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
          {perks.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <motion.div
                key={`${p.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <Icon className="h-10 w-10 text-secondary mx-auto mb-3" />
                <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-foreground/70 font-body text-sm">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">{formHeading}</h2>
          <p className="text-center text-foreground/70 font-body mb-8">
            {formDescription}
          </p>
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="position">Position you're applying for</Label>
              <Input
                id="position"
                placeholder="e.g. Personal Care Aide"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="resume">Resume (PDF or Word, max 10MB)</Label>
              {resume ? (
                <div className="mt-1 flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-secondary shrink-0" />
                    <span className="text-sm truncate">{resume.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResume(null)}
                    className="text-foreground/60 hover:text-foreground"
                    aria-label="Remove resume"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="resume"
                  className="mt-1 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border bg-background px-4 py-6 cursor-pointer hover:border-secondary/60 hover:bg-secondary/5 transition-colors"
                >
                  <Upload className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">Click to upload your resume</span>
                  <span className="text-xs text-foreground/60">PDF, DOC, or DOCX up to 10MB</span>
                </label>
              )}
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <div>
              <Label htmlFor="message">Tell us about yourself *</Label>
              <Textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
