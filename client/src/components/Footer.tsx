import React from "react";

import styles from "@/styles/components/Footer.module.scss";
import footerLogo from "@/assets/cog-white.svg";

/**
 * A dumb component to render the footer.
 * @constructor
 */
const Footer: React.FC<LibraryComponent> = () => (
    <footer className={styles.footer}>
        <img src={footerLogo} alt={"CognitoMart footer logo"}/>
    </footer>
);

export default Footer;