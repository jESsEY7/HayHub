import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface QuotationItem {
    id: number;
    product: number;
    product_name: string;
    quantity: number;
    price_at_time: number;
    total_price: number; // Decimal string or number? DRF sends string for DecimalField unless coerced.
    // I updated Serializer to not have specific coercion for total_price, so it is string.
    // But ProductSerializer.price is number (cents).
    // QuotationItemSerializer has read_only total_price.
    // Let's assume string and parse it, or update serializer.
    // For now, I'll treat as string/number union or just any.
}

export interface Quotation {
    id: number;
    status: string;
    notes: string;
    created_at: string;
    items: QuotationItem[];
    session_key: string | null;
}

export function useQuotation() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: quotation, isLoading, isError: isQueryError } = useQuery<Quotation>({
        queryKey: ["/api/quotations/current/"],
        retry: 3, // Retry a few times in case session is just starting
        staleTime: 0, // Always fetch fresh to get session key
    });

    const addItemMutation = useMutation({
        mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
            if (!quotation?.id) throw new Error("No active quotation");

            return await apiRequest("POST", `/api/quotations/${quotation.id}/add_item/`, {
                product_id: productId,
                quantity,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/quotations/current/"] });
            toast({ title: "Item added to quote", description: "Your selection has been updated." });
        },
        onError: (e) => {
            toast({ title: "Error adding item", description: String(e), variant: "destructive" });
        }
    });

    const confirmMutation = useMutation({
        mutationFn: async ({ customerPhone }: { customerPhone?: string } = {}) => {
            if (!quotation?.id) throw new Error("No active quotation");
            const res = await apiRequest("POST", `/api/quotations/${quotation.id}/confirm/`, {
                customer_phone: customerPhone
            });
            return await res.json();
        },
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["/api/quotations/current/"] });
            toast({ title: "Quotation confirmed!", description: `Invoice ${data.invoice_number} generated.` });
        },
        onError: (e) => {
            toast({ title: "Error confirming quote", description: String(e), variant: "destructive" });
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (data: { notes?: string }) => {
            if (!quotation?.id) throw new Error("No active quotation");
            return await apiRequest("PATCH", `/api/quotations/${quotation.id}/`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/quotations/current/"] });
            toast({ title: "Quote updated" });
        }
    });

    return {
        quotation,
        isLoading,
        addItem: addItemMutation.mutate,
        confirm: confirmMutation.mutate,
        update: updateMutation.mutate,
        isAdding: addItemMutation.isPending,
        isConfirming: confirmMutation.isPending,
        isUpdating: updateMutation.isPending,
        isError: isQueryError || (!quotation && !isLoading),
    };
}
