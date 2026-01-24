import React, { createContext, useContext, useState, ReactNode } from "react";

interface QuotationUIContextType {
    isOpen: boolean;
    openQuote: () => void;
    closeQuote: () => void;
    toggleQuote: () => void;
}

const QuotationUIContext = createContext<QuotationUIContextType | undefined>(undefined);

export function QuotationUIProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openQuote = () => setIsOpen(true);
    const closeQuote = () => setIsOpen(false);
    const toggleQuote = () => setIsOpen((prev) => !prev);

    return (
        <QuotationUIContext.Provider value={{ isOpen, openQuote, closeQuote, toggleQuote }}>
            {children}
        </QuotationUIContext.Provider>
    );
}

export function useQuotationUI() {
    const context = useContext(QuotationUIContext);
    if (context === undefined) {
        throw new Error("useQuotationUI must be used within a QuotationUIProvider");
    }
    return context;
}
