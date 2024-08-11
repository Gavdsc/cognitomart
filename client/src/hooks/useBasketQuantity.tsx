import { useMemo } from "react";
import { useSnapshot } from "valtio";
import state from "@/state/store";

/**
 * Hook to calculate and memoise the correct basket quantities.
 */
const useBasketQuantity = () => {
    const snap = useSnapshot(state);

    const quantity: number = useMemo(() =>
        [...snap.basket.items].reduce((accumulator,[_, quantity]) =>
            accumulator + quantity, 0
        ), [snap.basket.items]);
    
    return quantity;
}

export default useBasketQuantity;