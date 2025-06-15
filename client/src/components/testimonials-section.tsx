import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import GlassmorphicCard from "./glassmorphic-card";

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
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard className="p-6 hover-lift relative">
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
          ))}
        </div>
      </div>
    </section>
  );
}