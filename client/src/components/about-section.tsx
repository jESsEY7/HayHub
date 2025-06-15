import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award } from "lucide-react";
import GlassmorphicCard from "./glassmorphic-card";

export default function AboutSection() {
  const features = [
    "Locally sourced, sustainably grown hay",
    "State-of-the-art processing and storage",
    "Expert agricultural consultation services",
  ];

  const stats = [
    { value: "10000", label: "Bales Delivered" },
    { value: "500", label: "Happy Customers" },
    { value: "15", label: "Years Experience" },
    { value: "99", label: "% Satisfaction" },
  ];

  return (
    <>
      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="p-8 hover-lift">
                  <div className="text-4xl font-bold text-forest mb-2">
                    {stat.value}
                    {stat.label.includes("%") ? "%" : "+"}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Growing{" "}
                <span className="holographic-text">Excellence</span>{" "}
                Since 2008
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                HayFlow has been a trusted partner to farmers, ranchers, and agricultural businesses across the region. Our commitment to quality and service has made us the preferred supplier for premium hay products.
              </p>
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-forest text-xl mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="holographic-bg text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Learn Our Story
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                alt="Modern farming equipment in field"
                className="rounded-2xl shadow-2xl w-full"
              />
              <GlassmorphicCard className="absolute -bottom-6 -left-6 p-6 max-w-xs">
                <div className="flex items-center mb-2">
                  <Award className="text-wheat text-2xl mr-3" />
                  <h4 className="font-bold text-gray-900">Award Winning</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Regional Excellence in Agricultural Supply 2023
                </p>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
