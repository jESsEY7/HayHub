import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import GlassmorphicCard from "./glassmorphic-card";
import { Button } from "@/components/ui/button";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Ranch Owner",
      content: "HayFlow has been our trusted supplier for over 5 years. Their quality is unmatched and delivery is always on time.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
    {
      name: "Mike Thompson",
      title: "Dairy Farmer",
      content: "The premium alfalfa bales have significantly improved our milk production. Outstanding quality and service!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
    {
      name: "Lisa Martinez",
      title: "Equestrian Center",
      content: "Perfect square bales for our horses. Clean, fresh, and consistently high quality. Highly recommend HayFlow!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
    {
      name: "Robert Davis",
      title: "Cattle Rancher",
      content: "Exceptional service and top-quality hay. Our cattle have never been healthier. HayFlow delivers excellence every time.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
    {
      name: "Jennifer Wilson",
      title: "Horse Trainer",
      content: "The consistency and quality of their hay is remarkable. Our horses love it and we've seen great improvements in their health.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our{" "}
            <span className="holographic-text">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the farmers and ranchers who trust HayFlow for their agricultural needs
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="mr-4"
                  >
                    <GlassmorphicCard className="p-6 hover-lift relative h-full">
                      <Quote className="absolute top-4 right-4 text-forest text-2xl opacity-20" />
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600">{testimonial.title}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                      <p className="text-gray-700 italic">"{testimonial.content}"</p>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
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
        </div>
      </div>
    </section>
  );
}

