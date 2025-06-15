import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import GlassmorphicCard from "./glassmorphic-card";
import { Circle, Square, Star } from "lucide-react";
import { type Product } from "@shared/schema";

export default function ProductsSection() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "round":
        return <Circle className="text-forest text-lg mr-3" />;
      case "square":
        return <Square className="text-forest text-lg mr-3" />;
      case "alfalfa":
        return <Star className="text-forest text-lg mr-3" />;
      default:
        return <Circle className="text-forest text-lg mr-3" />;
    }
  };

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(0)}`;
  };

  const handleOrderNow = () => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="holographic-text">Premium Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From small square bales to large round bales, we provide premium quality hay for all your agricultural needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <GlassmorphicCard key={index} className="p-6">
                  <Skeleton className="w-full h-48 rounded-xl mb-6" />
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-20 w-full mb-6" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-10 w-24 rounded-full" />
                  </div>
                </GlassmorphicCard>
              ))
            : products?.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassmorphicCard className="p-6 hover-lift group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-xl mb-6"
                    />
                    <div className="flex items-center mb-4">
                      {getIcon(product.type)}
                      <h3 className="text-2xl font-bold text-gray-900">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-forest">
                        {formatPrice(product.price)}/bale
                      </span>
                      <Button
                        onClick={handleOrderNow}
                        className="holographic-bg text-white hover:scale-105 transition-transform"
                      >
                        Order Now
                      </Button>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
