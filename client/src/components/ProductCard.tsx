import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import Price from "@/components/Price";

/**
 * Props interface for the product card component.
 */
interface ProductCardProps extends LibraryComponent {
    productId: number, 
    name: string,
    price: number,
    children?: ReactNode
}

/**
 * Component to display product details in a card layout.
 * @param className - Additional classes.
 * @param productId - The product id for navigation.
 * @param name - The name of the product.
 * @param price - The price of the product.
 * @param children - Any additional children.
 * @constructor
 */
const ProductCard: React.FC<ProductCardProps> = ({ className = "", productId, name, price, children = null }) => (
    <div className={className}>
        <NavLink to={`/shop/product/${productId}`} aria-label={`Link to product ${productId}`} end>
            <h4>{name}</h4>
        </NavLink>
        <Price symbol={"£"} price={price} />
        { children && children }
    </div>
);

export default ProductCard;