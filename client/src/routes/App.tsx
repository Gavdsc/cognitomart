import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import styles from "@/styles/App.module.scss";

/**
 * Component to render the main App.
 * @constructor
 */
const App: React.FC<LibraryComponent> = () => (
    <div className={styles.mainWrapper}>
        <Header />
        <main className={styles.main}>
            <Outlet />
        </main>
        <Footer /> 
    </div>
);


export default App;