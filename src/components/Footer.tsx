import { Heart } from "lucide-react";
import logo from "@/assets/impire-home-care-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src={logo} alt="Impire Home Care LLC" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
              Providing compassionate, professional home health care services that
              empower individuals to live with dignity and independence.
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
            © {new Date().getFullYear()} Impire Home Care LLC. All rights reserved.
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
