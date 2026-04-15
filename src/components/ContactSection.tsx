import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const ContactSection = () => {
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
              {[
                { icon: Phone, label: "(605) 321-8915", href: "tel:+16053218915" },
                { icon: Mail, label: "info@empirehomecare.com", href: "mailto:info@empirehomecare.com" },
                { icon: MapPin, label: "707 W 11th St, Sioux Falls, SD 57104", href: "https://maps.google.com/?q=707+W+11th+St+Sioux+Falls+SD+57104" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="text-foreground/80 font-body group-hover:text-secondary transition-colors">
                    {c.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-card rounded-xl p-8 shadow-sm border border-border space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Chance"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="(123) 456-7890"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">
                  How Can We Help?
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your care needs..."
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3.5 text-base font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
              >
                Request Free Consultation
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
