import React, { lazy, Suspense } from "react";
import { NavLink } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";
import { useSnapshot } from "valtio";
import state from "@/state/store";
import Price from "@/components/Price";
import LoadingProduct from "@/components/LoadingProduct";
import {MergeClasses} from "@/common/utilities";

import styles from "@/styles/routes/BasketView.module.scss";
import useBasketQuantity from "@/hooks/useBasketQuantity";

// Lazy load the basket list.
const BasketList = lazy(() => import("@/components/BasketList"));

/**
 * Component to render the Basket page.
 * @constructor
 */
const BasketView: React.FC<LibraryComponent> = () => {
    const snap = useSnapshot(state);
    const quantity = useBasketQuantity();
    
    return (
        <>
            <Breadcrumb>
                <NavLink to={"/"} aria-label={"Link to the homepage"} end>Home</NavLink>
                <NavLink to={"/shop"} aria-label={"Link to the shop"} end>Shop</NavLink>
                <span>Basket</span>
            </Breadcrumb>
            <h1>Shopping Basket</h1>
            <Suspense fallback={<LoadingProduct />}>
                <BasketList />
            </Suspense>
            <Price className={styles.price} symbol={"£"} price={snap.basket.value} prefix={`Subtotal (${quantity} items): `} />
            <NavLink to={"/shop/checkout"} aria-label={"Link to the checkout (404)"} className={MergeClasses("button", styles.mobileCheckout)} end>Checkout</NavLink>
        </>
    );
}

export default BasketView;