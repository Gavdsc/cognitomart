import React from "react";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

import styles from "@/styles/components/Header.module.scss";

/**
 * A dumb component to render the header.
 * @constructor
 */
const Header: React.FC<LibraryComponent> = () => (
    <header className={styles.header}>
        <Logo/>
        <Navigation/>
    </header>
);

export default Header;