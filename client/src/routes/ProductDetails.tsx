import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "@/state/store";
import QuantityPicker from "@/components/QuantityPicker";
import { addToBasket } from "@/state/actions";
import Breadcrumb from "@/components/Breadcrumb";
import Price from "@/components/Price";

import styles from "@/styles/routes/ProductDetails.module.scss";
import imgNotAvailable from "@/assets/image-not-available.svg";

export const loader = async ({ params }: any) => {
    // Note: In a real world scenario the individual product is fetched from the server here.
    
    // Can get the product id from the loader, but you can't check the snapshot from the loader    
    const id: number = parseInt(params.productId, 10);
    
    return { id };
}

/**
 * Component to render product details.
 * @constructor
 */
const ProductDetails: React.FC<LibraryComponent> = () => {
    const snap = useSnapshot(state);
    const { id} = useLoaderData() as { id: number };

    // Directly access the product from snap.products avoiding the need for internal state/useEffect
    const product = snap.products.get(id);
    
    // Throw a 404 response when this isn't found (will give an uncaught error in console and be caught by the error page).
    // Note: Could gracefully fail this in the component and avoid router error handlers.
    if (!product)
        throw new Response("", {
            status: 404,
            statusText: "Product not found."
        });
     
    return (
        <div className={styles.page}>
            <Breadcrumb className={styles.breadCrumb}>
                <NavLink to={"/"} aria-label={"Link to the homepage"} end>Home</NavLink>
                <NavLink to={"/shop"} aria-label={"Link to the shop"} end>Shop</NavLink>
                <span>{product.name}</span>
            </Breadcrumb>
            <div className={styles.imageContainer}>
                <img src={imgNotAvailable} alt={"Image not available"}></img>
            </div>
            <div className={styles.productDetails}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <Price symbol={"£"} price={product.price} />
                <QuantityPicker 
                    className={styles.quantityPicker} 
                    quantity={snap.basket.items.get(product.id) ?? 0} 
                    min={0} 
                    max={99} 
                    callback={(quantity: number) => addToBasket(product.id,  quantity)} 
                />
            </div>
        </div>
    );
}

export default ProductDetails;