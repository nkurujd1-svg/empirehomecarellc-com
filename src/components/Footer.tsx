import { Heart } from "lucide-react";
import logo from "@/assets/empire-home-care-logo.png";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 3.77.92V6.69Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src={logo} alt="Empire Home Care LLC" className="h-24 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed mb-4">
              Providing compassionate, professional home health care services that
              empower individuals to live with dignity and independence.
            </p>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
              📍 707 W 11th St, Sioux Falls, SD 57104
            </p>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
              📞 <a href="tel:+16053218915" className="hover:text-primary-foreground transition-colors">(605) 321-8915</a>
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "About", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-body transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Our Services</h4>
            <ul className="space-y-2">
              {["Personal Care", "Skilled Nursing", "Companion Care", "Respite Care", "Chronic Disease Mgmt"].map((s) => (
                <li key={s}>
                  <span className="text-primary-foreground/60 text-sm font-body">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-xs font-body">
            © {new Date().getFullYear()} Empire Home Care LLC. All rights reserved.
          </p>
          <p className="text-primary-foreground/40 text-xs font-body flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-secondary fill-secondary" /> for families
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
