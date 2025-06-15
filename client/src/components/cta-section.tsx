import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import GlassmorphicCard from "./glassmorphic-card";

export default function CTASection() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset;
        const ctaOffset = scrolled * -0.4;
        backgroundRef.current.style.transform = `translate3d(0, ${ctaOffset}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 to-saddle/90" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <GlassmorphicCard variant="dark" className="p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get{" "}
              <span className="text-wheat">Premium Hay?</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust HayFlow for their agricultural needs. 
              Get your custom quote today and experience the difference quality makes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={handleContactClick}
                size="lg"
                className="holographic-bg text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-morphism text-white border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (555) 123-4567
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-wheat mb-2">Same Day</div>
                <div className="text-gray-300">Delivery Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wheat mb-2">100%</div>
                <div className="text-gray-300">Quality Guarantee</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wheat mb-2">15+ Years</div>
                <div className="text-gray-300">Industry Experience</div>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </section>
  );
}