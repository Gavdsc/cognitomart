import React, {useMemo} from "react";
import ProductCard from "@/components/ProductCard";
import QuantityPicker from "@/components/QuantityPicker";
import {addToBasket} from "@/state/actions";
import {useSnapshot} from "valtio";
import state from "@/state/store";
import { MergeClasses } from "@/common/utilities";

import styles from "@/styles/components/ProductList.module.scss";

/**
 * Component to filter lists of products in the basket.
 * @param className - Additional classnames
 * @constructor
 */
const BasketList: React.FC<LibraryComponent> = ({ className = "" }) => {
    const snap = useSnapshot(state);
    
    const products: Product[] = useMemo(() => {
        // Guard against no products
        if (snap.products.size == 0)
            return [];
        
        // Map, filter and validate
        return [...snap.basket.items.keys()].map((productId, _): null | Product => {
            
            if (!snap.products.has(productId)) {
                // Note1: If the product doesn't exist then it is already filtered out of the subtotal.
                // Note2: stale products are being removed from basket on init so this shouldn't fire unless the application is scaled.
                // Note3: the staleProductHandle() action could be fired here as there may be stale products if validation fails.
                
                console.warn(`Product with Id ${productId} not found in products map.`);
                return null;
            }

            // Note, sometimes Valtio can annoyingly return a proxied object rather than the value of the object. Clone it with a spread operator.
            return {...snap.products.get(productId)} as Product;
        }).filter(product=> product !== null)
    }, [snap.basket.items, snap.products]);
    
    return (
        <div className={MergeClasses(className, styles.container)}>
            { products && products.length > 0 ?
                products.map(product =>
                    <ProductCard className={MergeClasses("borderedContainer", "flexCardLayout", styles.product)} key={product.id} productId={product.id} name={product.name} price={product.price}>
                        <QuantityPicker quantity={snap.basket.items.get(product.id) ?? 0} min={0} max={99} callback={(quantity: number) => addToBasket(product.id,  quantity)} />
                    </ProductCard>
                ) : snap.basket.items.size == 0 ? <span>Basket is empty</span> : <span>Error loading products</span>
            }
        </div>
    );    
}

export default BasketList;