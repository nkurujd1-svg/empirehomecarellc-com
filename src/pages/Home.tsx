import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HomeAboutPreview from "@/components/HomeAboutPreview";
import HomeServicesPreview from "@/components/HomeServicesPreview";
import Footer from "@/components/Footer";

const Home = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <HomeAboutPreview />
    <HomeServicesPreview />
    <Footer />
  </div>
);

export default Home;
