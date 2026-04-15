import { Heart } from "lucide-react";
import logo from "@/assets/empire-home-care-logo.png";

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 3.77.92V6.69Z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
