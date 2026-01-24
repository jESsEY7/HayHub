import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCurrency } from "@/lib/currencyContext";

export default function CalculatorPopup() {
    const [bales, setBales] = useState("");
    const [price, setPrice] = useState("");
    const { symbol } = useCurrency();

    const total = (parseFloat(bales) || 0) * (parseFloat(price) || 0);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white shadow-sm">
                    <Calculator className="h-5 w-5 text-gray-700" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-none bg-transparent shadow-none" align="end">
                <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Quick Estimate
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Number of Bales</label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="e.g. 50"
                                value={bales}
                                onChange={(e) => setBales(e.target.value)}
                                className="bg-white/50 border-gray-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Price per Bale ({symbol})</label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="e.g. 450"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="bg-white/50 border-gray-200"
                            />
                        </div>

                        <div className="pt-4 mt-2 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Estimated Total:</span>
                                <span className="text-xl font-bold text-forest">
                                    {symbol} {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
