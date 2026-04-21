import { Link } from "react-router-dom";
import logoFallback from "@/assets/empire-home-care-logo.png";
import { useServices, useSiteSettings, useSocialLinks } from "@/hooks/useSiteData";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getSocialIcon, getSocialLabel } from "@/lib/socialIcons";

const Footer = () => {
  const { data: settings } = useSiteSettings();
  const socials = useSocialLinks();
  const { data: services } = useServices();
  const { data: footerContent } = useSiteContent("footer", {
    quick_links_heading: "Quick Links",
    services_heading: "Our Services",
    copyright_suffix: "All rights reserved.",
    tagline: "Made with ❤️ for families",
  });

  const logo = settings?.logo_url || logoFallback;
  const businessName = settings?.business_name || "Empire Home Care LLC";
  const footerAbout =
    settings?.footer_about ||
    "Providing compassionate, professional home health care services that empower individuals to live with dignity and independence.";
  const address = settings?.address;
  const phone = settings?.phone;
  const phoneHref = settings?.phone_href;

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src={logo} alt={businessName} className="h-24 w-auto mb-4 object-contain brightness-0 invert" />
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed mb-4">
              {footerAbout}
            </p>
            {address && (
              <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
                📍 {address}
              </p>
            )}
            {phone && (
              <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
                📞{" "}
                <a
                  href={phoneHref || `tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {phone}
                </a>
              </p>
            )}
            {socials.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {socials.map((s) => {
                  const Icon = getSocialIcon(s.platform);
                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={getSocialLabel(s.platform)}
                      className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">{footerContent.quick_links_heading}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-body transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">{footerContent.services_heading}</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-body transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-xs font-body">
            © {new Date().getFullYear()} {businessName}. {footerContent.copyright_suffix}
          </p>
          <p className="text-primary-foreground/40 text-xs font-body flex items-center gap-1">
            {footerContent.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
