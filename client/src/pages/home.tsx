import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProductsSection from "@/components/products-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
