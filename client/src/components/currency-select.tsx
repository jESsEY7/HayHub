import { useCurrency } from "@/lib/currencyContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Coins } from "lucide-react";

export default function CurrencySelect({ className }: { className?: string }) {
    const { currency, setCurrency } = useCurrency();

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Coins className="h-4 w-4 text-forest" />
            <Select value={currency} onValueChange={(v: "KES" | "USD" | "EUR") => setCurrency(v)}>
                <SelectTrigger className="w-[80px] h-8 text-xs bg-white/50 border-forest/20">
                    <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="KES">KES</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
