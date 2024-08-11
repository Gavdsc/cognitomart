import { staleProductHandle } from "../../src/state/actions";

import mockState from "../../__mocks__/state/mockStore";

// Mocking the state
jest.mock('@/state/store', () => {

    // Require the actual state so we can manipulate it later.
    const state = jest.requireActual("../../__mocks__/state/mockStore");

    return {
        __esModule: true,
        default: state.default
    }
})

describe('staleProductHandle', () => {
    beforeEach(() => {
        // Reset the state before each test
        mockState.basket.items.clear();
        mockState.products.clear();
    });

    test('should remove stale products from the basket', () => {
        // productId: 1, quantity: 2
        mockState.basket.items.set(1, 2);
        // productId: 2, quantity: 3
        mockState.basket.items.set(2, 3);
        // Only Product 1 exists
        mockState.products.set(1, { id: 1, name: "Product 1", price: 1.00 });

        // Run the stale file handle
        staleProductHandle();
        
        expect(mockState.basket.items.size).toBe(1);
        expect(mockState.basket.items.has(1)).toBe(true);
        expect(mockState.basket.items.has(2)).toBe(false);
    });

    test('should not remove any products if all are still valid', () => {
        // productId: 1, quantity: 2
        mockState.basket.items.set(1, 2);
        // productId: 2, quantity: 3
        mockState.basket.items.set(2, 3);
        // Product 1 exists
        mockState.products.set(1, { id: 1, name: "Product 1", price: 1.00 });
        // Product 2 exists
        mockState.products.set(2, { id: 2, name: "Product 2", price: 1.00 });

        // Run the stale file handle
        staleProductHandle();
        
        expect(mockState.basket.items.size).toBe(2);
        expect(mockState.basket.items.has(1)).toBe(true);
        expect(mockState.basket.items.has(2)).toBe(true);
    });

    test('should do nothing if the basket is empty', () => {
        // Basket is empty

        // Run the staleProductHandle function
        staleProductHandle();

        // Basket should remain empty
        expect(mockState.basket.items.size).toBe(0); 
    });
});