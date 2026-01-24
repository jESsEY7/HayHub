import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "KES" | "USD" | "EUR";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    formatPrice: (priceInCents: number) => string; // priceInCents is assuming Base Unit of Primary Currency (KES)
    convertPrice: (priceInCents: number) => number;
    symbol: string;
}

const RATES = {
    KES: 1,
    USD: 0.0076, // Approx 1 KES = 0.0076 USD
    EUR: 0.0070,
};

const SYMBOLS = {
    KES: "KSh",
    USD: "$",
    EUR: "€",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>("KES");

    const formatPrice = (priceInCents: number) => {
        // priceInCents comes from Backend as KES cents (or just 100x KES value)
        // base value in KES
        const kesValue = priceInCents / 100;

        // Convert
        const convertedValue = kesValue * RATES[currency];

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(convertedValue);
    };

    const convertPrice = (priceInCents: number) => {
        return (priceInCents / 100) * RATES[currency];
    };

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency,
            formatPrice,
            convertPrice,
            symbol: SYMBOLS[currency]
        }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
