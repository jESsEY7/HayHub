import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Play, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import GlassmorphicCard from "./glassmorphic-card";

export default function HeroSection() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        backgroundRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToProducts = () => {
    const element = document.querySelector("#products");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <GlassmorphicCard className="p-8 md:p-12 animate-float">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Premium{" "}
              <span className="holographic-text">Hay Bales</span>{" "}
              for Your Farm
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Quality agricultural solutions delivered with professional excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleScrollToContact}
                size="lg"
                className="holographic-bg text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
              <Button
                onClick={handleScrollToProducts}
                variant="outline"
                size="lg"
                className="glass-morphism text-white border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}
