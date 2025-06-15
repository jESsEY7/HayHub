import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import GlassmorphicCard from "./glassmorphic-card";

export default function ContactSection() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset;
        const contactOffset = scrolled * -0.2;
        backgroundRef.current.style.transform = `translate3d(0, ${contactOffset}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      productType: "",
      message: "",
    },
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    createContactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-white" />,
      title: "Location",
      content: "1234 Farm Road, Agricultural Valley, AV 12345",
    },
    {
      icon: <Phone className="text-white" />,
      title: "Phone",
      content: "(555) 123-4567",
    },
    {
      icon: <Mail className="text-white" />,
      title: "Email",
      content: "info@hayflow.com",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "7:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute inset-0 parallax"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Your <span className="text-wheat">Quote Today</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Contact our agricultural specialists for personalized service and
            competitive pricing on all hay products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassmorphicCard variant="dark" className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="First Name"
                              className="glass-morphism text-white placeholder-gray-300 border-0 focus:ring-2 focus:ring-wheat"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Last Name"
                              className="glass-morphism text-white placeholder-gray-300 border-0 focus:ring-2 focus:ring-wheat"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email Address"
                            className="glass-morphism text-white placeholder-gray-300 border-0 focus:ring-2 focus:ring-wheat"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productType"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="glass-morphism text-white border-0 focus:ring-2 focus:ring-wheat">
                              <SelectValue placeholder="Select Product Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="round">Round Bales</SelectItem>
                            <SelectItem value="square">Square Bales</SelectItem>
                            <SelectItem value="alfalfa">
                              Premium Alfalfa
                            </SelectItem>
                            <SelectItem value="custom">Custom Order</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Your message..."
                            className="glass-morphism text-white placeholder-gray-300 border-0 focus:ring-2 focus:ring-wheat min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={createContactMutation.isPending}
                    className="w-full holographic-bg text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {createContactMutation.isPending
                      ? "Sending..."
                      : "Send Message"}
                  </Button>
                </form>
              </Form>
            </GlassmorphicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <GlassmorphicCard key={index} variant="dark" className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 holographic-bg rounded-full flex items-center justify-center mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {info.title}
                    </h4>
                    <p className="text-gray-300">{info.content}</p>
                  </div>
                </div>
              </GlassmorphicCard>
            ))}

            <GlassmorphicCard variant="dark" className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Business Hours
              </h4>
              <div className="space-y-2 text-gray-300">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{schedule.day}</span>
                    <span>{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
