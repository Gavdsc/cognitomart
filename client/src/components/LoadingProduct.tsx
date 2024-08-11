import React from "react";
import { MergeClasses } from "@/common/utilities.ts";

import styles from "@/styles/components/LoadingProduct.module.scss";

/**
 * Loading product outline with shimmer effect.
 * @constructor
 */
const LoadingProduct: React.FC<LibraryComponent> = ({ className = "" }) => (
    <div className={MergeClasses(className, styles.product)}>
        <div className={MergeClasses(styles.heading, styles.shimmer)} />
        <div className={MergeClasses(styles.price, styles.shimmer)} />
        <div className={MergeClasses(styles.button, styles.shimmer)} />
    </div> 
);

export default LoadingProduct;