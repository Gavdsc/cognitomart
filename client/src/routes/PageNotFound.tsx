import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import styles from "@/styles/App.module.scss";
import {MergeClasses} from "@/common/utilities";

/**
 * Component to display a 404 page.
 * @constructor
 */
const PageNotFound: React.FC<LibraryComponent> = () => (
    <div className={styles.mainWrapper}>
        <Header />
        <main className={styles.main}>
            <div className={MergeClasses("borderedContainer", styles.notFoundContainer)}>
                <h1>404 Page Not Found</h1>
                <p>Have you arrived here by mistake?</p>
                <p>In an ideal world, this is returned from the server so that the right http headers can be set!</p>
            </div>
        </main>
        <Footer/>
    </div>
);


export default PageNotFound;