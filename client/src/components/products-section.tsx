import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import GlassmorphicCard from "./glassmorphic-card";
import { Circle, Square, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { type Product } from "@shared/schema";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function ProductsSection() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

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

  if (isLoading) {
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
            {Array.from({ length: 3 }).map((_, index) => (
              <GlassmorphicCard key={index} className="p-6">
                <Skeleton className="w-full h-48 rounded-xl mb-6" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full mb-6" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-10 w-24 rounded-full" />
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products?.map((product, index) => (
                <div key={product.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="mr-4"
                  >
                    <GlassmorphicCard className="p-6 hover-lift group h-full">
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
                      <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                      <div className="flex justify-between items-center mt-auto">
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
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg z-10"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg z-10"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          {products && products.length > 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-forest scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Fallback Grid for smaller screens or when carousel is not ideal */}
        <div className="md:hidden mt-12">
          <div className="grid grid-cols-1 gap-8">
            {products?.map((product, index) => (
              <motion.div
                key={`grid-${product.id}`}
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
      </div>
    </section>
  );
}

