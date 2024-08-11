import React, { ReactNode } from "react";
import styles from "@/styles/components/Breadcrumb.module.scss";
import { MergeClasses } from "@/common/utilities.ts";

/**
 * Props for the Breadcrumb component.
 */
interface BreadcrumbProps extends LibraryComponent {
    children?: ReactNode | ReactNode[] | null
}

/**
 * A simple breadcrumb.
 * @param className - Additional class names.
 * @param children - The nav links/paths to include in the breadcrumb.
 * @constructor
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ className = "", children }) => (
    <nav className={MergeClasses(className, styles.nav)}>
        {children}
    </nav>
);

export default Breadcrumb;