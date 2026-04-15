import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/empire-home-care-logo.png";

const navLinks = ["Home", "Services", "About", "Testimonials", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#home" onClick={() => scrollTo("Home")}>
          <img src={logo} alt="Empire Home Care LLC" className="h-14 w-auto cursor-pointer" />
        </a>

        <ul className="hidden md:flex items-center gap-8 font-body text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className="text-foreground/70 hover:text-secondary transition-colors"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>


        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-card border-t border-border"
        >
          <ul className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className="text-foreground/80 hover:text-secondary transition-colors font-medium"
                >
                  {link}
                </button>
              </li>
            ))}
            <li>
              <a
                href="tel:+10789652258"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
