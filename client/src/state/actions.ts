import state from "@/state/store";
import { proxyMap } from "valtio/utils";
import { fetchProducts } from "@/state/fetch";

/**
 * An asynchronous function to initialise products Map after fetch.
 * The function also updates the basket and removes stale products.
 */
export const initProducts = async () => {
    const products: Product[] = await fetchProducts();
    const productsMap= proxyMap<number, Product>();

    products.forEach(product => {
        productsMap.set(product.id, product);
    });

    state.products = productsMap;
    
    // Assume that if there is a product response stale products in the basket should be handled.
    if (productsMap.size > 0)
        staleProductHandle();
    
    updateBasketValue();
}

/**
 * @deprecated This function can be removed.
 * Function to add multiple products to the state.
 * @param products
 */
export const addProducts = (...products: Product[]) => {
    console.warn('Add products is a deprecated function without sufficient validation.');
    
    // Each product Id is offset due to array starting at 0, and we want to be able to sort them
    products.forEach(product => {
        state.products.set(product.id, product);
    })
}

/**
 * Function to remove an entire item from the basket.
 * @param productId - The id of the product to remove.
 */
export const removeFromBasket = (productId: number) => addToBasket(productId, 0);

/**
 * Function to add/update a product in the basket. Adding 0 will remove the item.
 * @param productId - The id of the product to add.
 * @param quantity - The quantity to add.
 */
export const addToBasket = (productId: number, quantity: number) => {
    // Guard against adding 0
    if (!state.basket.items.has(productId) && quantity == 0)
        return;
    
    // Remove item if quantity is 0
    if (quantity == 0) {
        state.basket.items.delete(productId);
        updateBasketValue();
        return;
    }
    
    // Because we are using a map, we don't have to worry about checking unique
    state.basket.items.set(productId, quantity);
    updateBasketValue();
}

/**
 * A function to update the basket value total.
 */
export const updateBasketValue = () => {    
    // Divide total by 100 to return to pounds.pence (Note: could just be forEach on the map)
    let value: number = [...state.basket.items].reduce((accumulator, [id, quantity]): number => {
        const product: Product | undefined = state.products.get(id);
        
        if (product == undefined || isNaN(product.price))
            return accumulator;
        
        // Circumvent floating point precision error by converting to pence
        const pence: number = product.price * 100;
        
        return accumulator + (pence * quantity);
    }, 0);
    
    value /= 100;

    state.basket.value = value;
}

/**
 * A very crude stale product handle.
 * Note: ideally this should be handled on the server.
 */
export const staleProductHandle = (): void => {
    if (state.basket.items.size == 0)
        return;
    
    // Create a temporary array to loop
    const basket = [...state.basket.items];
    
    basket.forEach(([productId, _]) => {
        if (state.products.has(productId))
            return;

        // Remove the stale product.
        state.basket.items.delete(productId);
    });
}