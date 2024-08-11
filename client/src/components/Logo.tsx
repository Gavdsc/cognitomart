import React from "react";
import {NavLink} from "react-router-dom";

import styles from "@/styles/components/Logo.module.scss";
import logo from "@/assets/cognitmart-logo.svg";

/**
 * A dumb component to render the logo.
 * @param className - Additional classes.
 * @constructor
 */
const Logo: React.FC<LibraryComponent> = ({ className= "" }) => (
    <NavLink className={className} to={"/"} aria-label={"Link to the homepage"} end>
        <div className={styles.logo}>
            <img src={logo} alt={"CognitoMart logo"} />
            <div className={styles.textBox}>
                <h3>CognitoMart</h3>
                <span>Imaginary food delivered pixel by pixel</span>
            </div>
        </div>
    </NavLink>
);

export default Logo;