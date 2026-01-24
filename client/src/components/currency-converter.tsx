import { useCurrency } from "@/lib/currencyContext";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coins } from "lucide-react";

export default function CurrencyConverter() {
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="fixed top-24 right-4 z-40">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="glass-morphism border-wheat/20 text-forest bg-white/80">
                        <Coins className="mr-2 h-4 w-4" />
                        {currency}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-morphism bg-white/90">
                    <DropdownMenuItem onClick={() => setCurrency("KES")}>
                        🇰🇪 KES (Shilling)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrency("USD")}>
                        🇺🇸 USD (Dollar)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrency("EUR")}>
                        🇪🇺 EUR (Euro)
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
