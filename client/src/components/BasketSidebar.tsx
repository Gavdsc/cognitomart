import React, { Suspense, lazy } from "react";
import { NavLink } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "@/state/store";
import LoadingProduct from "@/components/LoadingProduct";
import Price from "@/components/Price";
import { MergeClasses } from "@/common/utilities";

import styles from "@/styles/components/BasketSidebar.module.scss";

// Lazy load the basket list until products promise resolves 
const BasketList = lazy(() => import("@/components/BasketList"));

/**
 * Component to display the basket details in a sidebar view.
 * @constructor
 */
const BasketSidebar: React.FC<LibraryComponent> = ({ className = "" }) => {
    const snap = useSnapshot(state);
    
    return (
        <div className={MergeClasses(className, "borderedContainer", "flexCardLayout", styles.container)}>
            <h2>Basket</h2>
            <Price symbol={"£"} price={snap.basket.value} prefix={"Total: "} />
            <NavLink className={"button"} to={"/shop/basket"} aria-label={"Link to the basket"} end>Checkout</NavLink>

            <h2>Groceries</h2>
            <div className={MergeClasses(styles.groceries)}>
                <Suspense fallback={<LoadingProduct />}>
                    <BasketList />
                </Suspense>
            </div>
        </div>
    );
}

export default BasketSidebar;