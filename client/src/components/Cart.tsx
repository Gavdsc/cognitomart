import React from "react";
import { MergeClasses } from "@/common/utilities";

import styles from "@/styles/components/Cart.module.scss";
import CartIcon from "@/assets/cart.svg";
import useBasketQuantity from "@/hooks/useBasketQuantity";

/**
 * Component to display a cart and basket count.
 * @constructor
 */
const Cart: React.FC<LibraryComponent> = ({ className = "" }) => {
    const quantity = useBasketQuantity();
    
    return (
        <div className={MergeClasses(className, styles.cart)}>
            <img src={CartIcon} alt={"Cart icon"} />
            {quantity > 0 && <span className={styles.count}>{quantity}</span>}
        </div>
    );
}

export default Cart;