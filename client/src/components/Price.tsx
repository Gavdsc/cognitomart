import React, { useEffect, useState } from "react";
import { MergeClasses } from "@/common/utilities.ts";

import styles from "@/styles/components/Price.module.scss";

/**
 * Props interface for the Price component.
 */
interface PriceProps extends LibraryComponent {
    price: number,
    symbol: string,
    prefix?: string
}

/**
 * Component to format prices.
 * @param className - Additional classes.
 * @param price - The value to be displayed.
 * @param symbol - The currency symbol (e.g. £).
 * @param prefix - String prefix (e.g. "Total: ").
 * @constructor
 */
const Price: React.FC<PriceProps> = ({ className = "", price, symbol, prefix = "" }) => {
    const [value, setValue] = useState("0.00");
    
    useEffect(() => {
        if (!price) {
            setValue("0.00");   
        }
        
        setValue(price.toFixed(2));
    }, [price])
    
    return (<span className={MergeClasses(className, styles.price)}>{`${prefix}${symbol}${value}`}</span>);
}

export default Price;