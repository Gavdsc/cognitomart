import React from "react";
import Price from "@/components/Price";
import { NavLink } from "react-router-dom";
import { MergeClasses } from "@/common/utilities";
import { useSnapshot } from "valtio";
import state from "@/state/store.ts";

import styles from "@/styles/components/BasketSidebar.module.scss";

/**
 * Component to display a summary sidebar on the basket page.
 * @param className - Additional classes.
 * @constructor
 */
const SummarySidebar: React.FC<LibraryComponent> = ({ className = "" }) => {
    const snap = useSnapshot(state);
    
    return (
        <div className={MergeClasses(className, "borderedContainer", "flexCardLayout", styles.container)}>
            <h2>Subtotal</h2>
            <Price symbol={"£"} price={snap.basket.value}/>
            <NavLink to={"/shop/checkout"} aria-label={"Link to the checkout (404)"} className="button" end>Checkout</NavLink>
        </div>
    );
}

export default SummarySidebar;