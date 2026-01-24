import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

import QuotationPopup from "@/components/quotation-popup";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

import WhatsAppFAB from "@/components/whatsapp-fab";
import { CurrencyProvider } from "@/lib/currencyContext";
import { QuotationUIProvider } from "@/lib/quotationUIContext";
import CurrencyConverter from "@/components/currency-converter";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuotationUIProvider>
        <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <QuotationPopup />
            <WhatsAppFAB />
          </TooltipProvider>
        </CurrencyProvider>
      </QuotationUIProvider>
    </QueryClientProvider>
  );
}

export default App;
