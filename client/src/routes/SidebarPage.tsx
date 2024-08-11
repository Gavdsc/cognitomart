import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import styles from "@/styles/routes/SidebarPage.module.scss";
import { MergeClasses } from "@/common/utilities.ts";

/**
 * Props interface for the SidebarPage component.
 */
interface SidebarPageProps extends LibraryComponent {
    children?: ReactNode | ReactNode[] | null;
}

/**
 * Component to template a page with a sidebar.
 * @param className - Additional classes.
 * @param children - The sidebar.
 * @constructor
 */
const SidebarPage: React.FC<SidebarPageProps> = ({ className = "", children = null }) => (
    <section className={MergeClasses(className, styles.container)}>
        <div className={styles.view}>
            <section className={MergeClasses("borderedContainer", styles.outletWrapper)}>
                <Outlet />
            </section>
        </div>
        <aside className={styles.sidebar}>
            { children }
        </aside>
    </section>
);

export default SidebarPage;