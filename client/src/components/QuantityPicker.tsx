import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { Clamp, MergeClasses, SimpleDebounce } from "@/common/utilities";

import styles from "@/styles/components/QuantityPicker.module.scss";

/**
 * Props interface for the Quantity Picker component.
 */
interface QuantityPickerProps extends LibraryComponent {
    quantity: number,
    min: number, 
    max: number, 
    callback: (quantity: number) => void
}

/**
 * Component to allow quantity to be increased and decreased.
 * @param className - Additional classes.
 * @param quantity - The starting quantity.
 * @param min - The minimum clamped value.
 * @param max - The maximum clamped value.
 * @param callback - Callback function on quantity change.
 * @constructor
 */
const QuantityPicker: React.FC<QuantityPickerProps> = ({ className = "", quantity = 0, min = 0, max = 99, callback }) => {
    // Use an input ref to avoid excessive re-renders.
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const debounceCallback = useCallback(SimpleDebounce(callback, 300), [callback]);
    
    useEffect(() => {
        if (!inputRef.current)
            return;
        
        inputRef.current.value = quantity.toString();
    }, [quantity])

    /**
     * Function to increase the quantity by 1.
     */
    const buttonIncrement = () => callback(quantity + 1);

    /**
     * Function to decrease the quantity by 1.
     */
    const buttonDecrement = () => callback(quantity - 1);

    /**
     * Function to change quantity when the input value is changed.
     * @param event - The input event.
     */
    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        
        // Note: This allows the input to be left empty, but the value will persist/not update.
        if (isNaN(newQuantity))
            return;

        // Clamp and debounce the new value.
        debounceCallback(Clamp(newQuantity, min, max));
    }

    /**
     * Function to ensure the user can only input numeric values.
     * @param event - The input event.
     */
    const inputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
                
        // Allow tab, enter, and other special keys
        const allowedKeys: string[] = ['Tab', 'Enter', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'ArrowUp', 'ArrowDown'];

        if (allowedKeys.includes(event.key) || /^\d$/.test(event.key)) {
            // Favour increase
            if (event.key == 'ArrowUp') {
                callback(quantity + 1);
                return;
            }

            if (event.key == 'ArrowDown') {
                callback(quantity - 1);
                return;
            }
            
            return;
        }
        
        event.preventDefault();
    }
    
    // Click event bubble blocked to allow use inside clickable components.
    return ( 
        <div className={className} onClick={(event) => event.preventDefault()}>
            { quantity <= 0 ?
                <button ref={buttonRef} className={"quantityButton"} type="button" aria-label="Add one item" onClick={buttonIncrement}>Add</button> :
                <div className={MergeClasses("quantityInputContainer", styles.buttonContainer)}>
                    <button className={"quantityButton"} type="button" aria-label="Decrease quantity" onClick={buttonDecrement}>-</button>
                    <input 
                        ref={inputRef} 
                        type="text" 
                        inputMode="numeric" 
                        defaultValue={quantity} 
                        onChange={inputChange}
                        onKeyDown={inputKeyPress}
                        aria-label={`Quantity: ${quantity}`}
                        aria-valuenow={quantity}
                        aria-valuemin={min}
                        aria-valuemax={max}
                    />
                    <button className={"quantityButton"} type="button" aria-label="Increase quantity" onClick={buttonIncrement}>+</button>
                </div>
            }
        </div>
    );
}

export default QuantityPicker;