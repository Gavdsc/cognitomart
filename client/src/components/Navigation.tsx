import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Burger from "@/components/Burger";
import { MergeClasses } from "@/common/utilities";
import Cart from "@/components/Cart";

import styles from "@/styles/components/Navigation.module.scss";

/**
 * Props interface for the Navigation component.
 */
interface NavigationProps extends LibraryComponent {
    duration?: number
}

/**
 * CSSProperties interface to add duration variable.
 */
interface DurationStyle extends React.CSSProperties {
    "--duration": string;
}

/**
 * Navigation component containing nav menu and basket link.
 * @param className - Additional classes.
 * @param duration - The duration of the menu animation.
 * @constructor
 */
const Navigation: React.FC<NavigationProps> = ({ className = "", duration = 500 }) => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    
    // Sync animation duration and timeout in component. useMemo is probably overkill.
    const durationStyle: DurationStyle = useMemo((): DurationStyle => ({
        "--duration": `${duration / 1000}s`
    }), [duration]);
    
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isBurgerOpen) {
            // Make the menu visible immediately.
            setIsHidden(false);
            timeoutId = setTimeout(() => setIsOpen(true), 1);
        } else {
            // Start the close transition.
            setIsOpen(false);
            timeoutId = setTimeout(() => setIsHidden(true), duration);
        }

        // Cleanup timeout on unmount or if isOpen changes.
        return () => clearTimeout(timeoutId);
    }, [isBurgerOpen, duration]);

    /**
     * Callback function to handle burger toggles.
     * @param open - Boolean to represent open/closed state.
     */
    const handleBurgerToggle = (open: boolean) => setIsBurgerOpen(open);
    
    // Note: toggling { display: none } means that aria-hidden is unnecessary on the <nav>.
    return (
        <div className={MergeClasses(className, styles.navContainer)}>
            <div className={
                 MergeClasses(
                     styles.nav,
                     isOpen ? styles.open : "",
                     isHidden ? styles.hidden : "")}
                 style={durationStyle}>
                <nav>
                    <NavLink to={"/"} aria-label={"Link to the homepage"} onClick={() => setIsBurgerOpen(false)} end>Home</NavLink>
                    <NavLink to={"/shop"} aria-label={"Link to the shop"} onClick={() => setIsBurgerOpen(false)} end>Shop</NavLink>
                </nav>
            </div>
            <Burger className={styles.burger} open={isBurgerOpen} callback={handleBurgerToggle} />
            <NavLink className={styles.cart} to={"/shop/basket"} aria-label={"Link to the basket"} end><Cart /></NavLink> 
        </div>
    )
}

export default Navigation;