import React, { Suspense, lazy } from "react";
import LoadingProduct from "@/components/LoadingProduct";
import Breadcrumb from "@/components/Breadcrumb";
import {NavLink} from "react-router-dom";

// Lazy load the product list.
const ProductList = lazy(() => import("@/components/ProductList"));

/**
 * Component to render the Shop as a view of products.
 * @constructor
 */
const ProductsView: React.FC<LibraryComponent> = () => {    
    return (
        <>
            <Breadcrumb>
                <NavLink to={"/"} aria-label={"Link to the homepage"} end>Home</NavLink>
                <span>Shop</span>
            </Breadcrumb>
            <h1>Shop</h1>
            <Suspense fallback={<LoadingProduct />}>
                <ProductList />
            </Suspense>
        </>
    );
}

export default ProductsView;