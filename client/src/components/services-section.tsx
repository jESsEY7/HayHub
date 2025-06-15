import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Truck, Shield, Warehouse, Handshake } from "lucide-react";
import GlassmorphicCard from "./glassmorphic-card";

export default function ServicesSection() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset;
        const servicesOffset = scrolled * -0.3;
        backgroundRef.current.style.transform = `translate3d(0, ${servicesOffset}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: <Truck className="text-white text-2xl" />,
      title: "Fast Delivery",
      description: "Same-day and next-day delivery options available across our service area",
    },
    {
      icon: <Shield className="text-white text-2xl" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all our hay products and services",
    },
    {
      icon: <Warehouse className="text-white text-2xl" />,
      title: "Storage Solutions",
      description: "Climate-controlled storage facilities to maintain hay quality year-round",
    },
    {
      icon: <Handshake className="text-white text-2xl" />,
      title: "Bulk Pricing",
      description: "Competitive wholesale pricing for large orders and contract customers",
    },
  ];

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-forest bg-opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete{" "}
            <span className="text-wheat">Agricultural Services</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Beyond premium hay bales, we offer comprehensive agricultural solutions for modern farming operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard variant="dark" className="p-6 text-center hover-lift">
                <div className="w-16 h-16 holographic-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
