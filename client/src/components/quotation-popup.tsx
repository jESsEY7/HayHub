import { motion, AnimatePresence } from "framer-motion";
import { useQuotation } from "@/hooks/use-quotation";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GlassmorphicCard from "./glassmorphic-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrency } from "@/lib/currencyContext";
import { useQuotationUI } from "@/lib/quotationUIContext";

export default function QuotationPopup() {
    const { quotation, confirm, update, isConfirming, isUpdating, isLoading } = useQuotation();
    const { formatPrice } = useCurrency();
    const { isOpen, closeQuote } = useQuotationUI();
    const [notes, setNotes] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        if (quotation?.notes) setNotes(quotation.notes);
    }, [quotation]);

    const itemCount = quotation?.items?.length || 0;
    const hasItems = itemCount > 0;

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Wait for animation to start/mount
            setTimeout(() => {
                contentRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    const handleNotesBlur = () => {
        if (quotation && notes !== quotation.notes) {
            update({ notes });
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="pointer-events-auto outline-none"
                    >
                        <GlassmorphicCard
                            ref={contentRef}
                            tabIndex={-1}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="quote-title"
                            className="w-80 p-6 backdrop-blur-xl bg-white/80 dark:bg-black/80 border border-white/20 shadow-2xl focus:ring-2 focus:ring-primary outline-none"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 id="quote-title" className="font-bold text-lg">Your Quote</h3>
                                <Button variant="ghost" size="icon" onClick={() => closeQuote()}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            {isLoading ? (
                                <div className="py-4 text-center text-gray-500">Loading...</div>
                            ) : !hasItems ? (
                                <div className="py-4 text-center text-gray-500">Your quote is empty.</div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="max-h-60 overflow-y-auto space-y-2">
                                        {quotation?.items.map((item) => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span>{item.quantity}x {item.product_name}</span>
                                                <span className="font-mono">
                                                    {formatPrice(parseFloat(String(item.total_price)) * 100)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase">Smart Notes</label>
                                        <Textarea
                                            value={notes}
                                            onChange={handleNotesChange}
                                            onBlur={handleNotesBlur}
                                            placeholder="Add special instructions..."
                                            className="bg-white/50 dark:bg-black/50 text-sm resize-none"
                                        />
                                        {isUpdating && <p className="text-xs text-green-500">Saving notes...</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                                        <Input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Enter your phone number..."
                                            className="bg-white/50 dark:bg-black/50 text-sm"
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <Button
                                            onClick={() => confirm({ customerPhone: phoneNumber })}
                                            disabled={isConfirming || !phoneNumber}
                                            className="w-full holographic-bg text-white hover:scale-105 transition-transform"
                                        >
                                            {isConfirming ? "Processing..." : "Confirm Quote"}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </GlassmorphicCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
