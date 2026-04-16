import Navbar from "@/components/Navbar";
import ServicesHero from "@/components/ServicesHero";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Services = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <ServicesHero />
      <ServicesSection />
    </div>
    <Footer />
  </div>
);

export default Services;
