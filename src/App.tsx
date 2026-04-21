import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminBranding from "./pages/AdminBranding";
import AdminSocial from "./pages/AdminSocial";
import AdminHeroSlides from "./pages/AdminHeroSlides";
import AdminServices from "./pages/AdminServices";
import AdminAbout from "./pages/AdminAbout";
import AdminCareers from "./pages/AdminCareers";
import AdminPageContent from "./pages/AdminPageContent";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="branding" element={<AdminBranding />} />
            <Route path="social" element={<AdminSocial />} />
            <Route path="hero" element={<AdminHeroSlides />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="careers" element={<AdminCareers />} />
            <Route path="page-content" element={<AdminPageContent />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
