import React from "react";
import { MergeClasses } from "@/common/utilities.ts";

import styles from "@/styles/components/Burger.module.scss";

/**
 * Props interface for the Burger component.
 */
interface BurgerProps extends LibraryComponent {
    open: boolean,
    callback: (open: boolean) => void
}

/**
 * A simple animated burger component.
 * @param className - Optional classes.
 * @param open - Open toggle boolean.
 * @param callback - Callback function for the menu.
 * @constructor
 */
const Burger: React.FC<BurgerProps> = ({ className = "", open, callback }) => {

    /**
     * Click handler to fire callbacks.
     */
    const clickHandler = () => callback(!open);

    // Using a button for accessibility.
    return (
        <button
            className={MergeClasses(className, styles.burger, open ? styles.open : "")}
            onClick={clickHandler}
            aria-label={"Toggle navigation menu"}
            aria-expanded={open}
            aria-controls={"Primary-navigation"}
        >
            <div/>
            <div/>
            <div/>
            <span className="screenReader">Menu</span>
        </button>
    )
}

export default Burger;