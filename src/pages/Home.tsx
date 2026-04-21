import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HomeAboutPreview from "@/components/HomeAboutPreview";
import HomeServicesPreview from "@/components/HomeServicesPreview";
import BrochurePreview from "@/components/BrochurePreview";
import Footer from "@/components/Footer";

const Home = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <HomeAboutPreview />
    <HomeServicesPreview />
    <BrochurePreview />
    <Footer />
  </div>
);

export default Home;
