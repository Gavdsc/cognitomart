import React, { useMemo } from "react";
import { useSnapshot } from "valtio"
import state from "@/state/store";
import ProductCard from "@/components/ProductCard";
import QuantityPicker from "@/components/QuantityPicker";
import { addToBasket } from "@/state/actions";

import styles from "@/styles/components/ProductList.module.scss";
import { MergeClasses } from "@/common/utilities";

/**
 * Component to display a list of products.
 * @param className - Optional classes.
 * @constructor
 */
const ProductList: React.FC<LibraryComponent> = ({ className = "" }) => {
    const snap = useSnapshot(state);
    
    // useMemo for product spread and potential 'nice-to-have' filtering/sorting.
    const sortedProducts: Product[] = useMemo(() => 
        [...snap.products.entries()].map(([_, product]) => ({
            ...product
        }))
    , [snap.products]);
    
    return (
        <div className={MergeClasses(className, styles.container)}>
            { sortedProducts && sortedProducts.length > 0 ?
                sortedProducts.map((product) =>
                    <ProductCard className={MergeClasses("borderedContainer", "flexCardLayout", styles.product)} key={product.id} productId={product.id} name={product.name} price={product.price}>
                       <QuantityPicker quantity={snap.basket.items.get(product.id) ?? 0} min={0} max={99} callback={(quantity: number) => addToBasket(product.id,  quantity)} />
                    </ProductCard>
                ) : <span>Error loading products</span>
            }
        </div>
    );
}

export default ProductList;