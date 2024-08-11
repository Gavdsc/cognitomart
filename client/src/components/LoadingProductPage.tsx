import React from "react";
import { MergeClasses } from "@/common/utilities.ts";

import styles from "@/styles/components/LoadingProductPage.module.scss";
import pageStyles from "@/styles/routes/ProductDetails.module.scss";

/**
 * Loading page outline with shimmer effect.
 * @param className - Additional classes.
 * @constructor
 */
const LoadingProductPage: React.FC<LibraryComponent> = ({ className = "" }) => (
    <div className={MergeClasses(className, pageStyles.page)}>
        <div className={MergeClasses(pageStyles.breadCrumb, styles.breadcrumb, styles.shimmer)} />
        <div className={MergeClasses(styles.image, styles.shimmer) } />
        <div className={pageStyles.productDetails}>
            <div className={MergeClasses(styles.heading, styles.shimmer)}/>
            <div className={MergeClasses(styles.description, styles.shimmer)}/>
            <div className={MergeClasses(styles.price, styles.shimmer)}/>
            <div className={MergeClasses(styles.button, styles.shimmer)}/>
        </div>
    </div>
);

export default LoadingProductPage;