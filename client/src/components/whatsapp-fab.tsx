import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppFAB() {
    const handleWhatsAppClick = () => {
        // Replace with actual number
        window.open("https://wa.me/254711213693", "_blank");
    };

    return (
        <motion.div
            className="fixed bottom-4 left-4 z-50 pointer-events-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <Button
                onClick={handleWhatsAppClick}
                className="rounded-full w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
            >
                <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                <span className="sr-only">Chat on WhatsApp</span>
            </Button>
        </motion.div>
    );
}
