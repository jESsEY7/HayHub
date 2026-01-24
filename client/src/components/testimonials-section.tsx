import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import GlassmorphicCard from "./glassmorphic-card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Ranch Owner",
      location: "Montana",
      content: "HayFlow has been our trusted supplier for over 5 years. Their quality is unmatched and delivery is always on time.",
      rating: 5,
    },
    {
      name: "Mike Thompson",
      title: "Dairy Farmer",
      location: "Wisconsin",
      content: "The premium alfalfa bales have significantly improved our milk production. Outstanding quality and service!",
      rating: 5,
    },
    {
      name: "Lisa Martinez",
      title: "Equestrian Center Director",
      location: "Kentucky",
      content: "Perfect square bales for our horses. Clean, fresh, and consistently high quality. Highly recommend HayFlow!",
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? "text-amber-500 fill-current" : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by{" "}
            <span className="holographic-text">Industry Leaders</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from the farmers and ranchers who trust HayFlow for their agricultural needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard className="p-8 hover-lift relative h-full flex flex-col">
                <Quote className="absolute top-6 right-6 text-forest/10 w-10 h-10" />

                <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

                <p className="text-gray-700 mb-6 flex-grow leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}