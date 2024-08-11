import { updateBasketValue } from "../../src/state/actions";

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

describe('updateBasketValue', () => {
    beforeEach(() => {
        // Reset the state before each test
        mockState.basket.items.clear();
        mockState.basket.value = 0;
        mockState.products.clear();
    });

    test('should calculate and update the basket value correctly', () => {
        // £10.99 for Product 1
        mockState.products.set(1, { id: 1, name: "Product 1", price: 10.99 });
        // £5.50 for Product 2
        mockState.products.set(2, { id: 2, name: "Product 2", price: 5.50 });
        // 2 x Product 1 in basket
        mockState.basket.items.set(1, 2);
        // 3 x Product 2 in basket
        mockState.basket.items.set(2, 3); 

        // Update the basket values
        updateBasketValue();
        
        // Total should be (2 * £10.99) + (3 * £5.50) = £21.98 + £16.50 = £38.48
        expect(mockState.basket.value).toBe(38.48);
    });

    test('should handle cases where a product in the basket does not exist in products', () => {
        // £10.99 for Product 1
        mockState.products.set(1, { id: 1, name: "Product 1", price: 10.99 }); 
        // 2 x Product 1
        mockState.basket.items.set(1, 2);
        // 3 x Product 2, which doesn't exist
        mockState.basket.items.set(2, 3);

        // Update the basket values
        updateBasketValue();
        
        // Total should be (2 * £10.99) = £21.98 because Product 2 doesn't exist
        expect(mockState.basket.value).toBe(21.98);
    });

    test('should set the basket value to 0 if the basket is empty', () => {
        // Basket is empty

        // Update the basket values
        updateBasketValue();
        
        expect(mockState.basket.value).toBe(0);
    });

    test('should handle a case where products have a price of zero', () => {
        // £0.00 for Product 1
        mockState.products.set(1, { id: 1, name: "Product 1", price: 0 });
        
        // 2 x Product 1 (which costs £0.00)
        mockState.basket.items.set(1, 2);

        // Update the basket values
        updateBasketValue();
        
        // Total should be 0 since the product price is £0.00
        expect(mockState.basket.value).toBe(0);
    });

    test('should handle cases where the product price is NaN or undefined', () => {
        // NaN price for Product 1
        mockState.products.set(1, { id: 1, name: "Product 1", price: NaN }); 
        // Valid price for Product 2
        mockState.products.set(2, { id: 2, name: "Product 2", price: 10.00 }); 
        // Undefined price for Product 3
        mockState.products.set(3, { id: 3, name: "Product 3", price: undefined as unknown as number });

        // 1 x Product 1 (price is NaN)
        mockState.basket.items.set(1, 1);
        // 2 x Product 2 (price is £10.00)
        mockState.basket.items.set(2, 2);
        // 1 x Product 3 (price is undefined)
        mockState.basket.items.set(3, 1);

        // Update the basket values
        updateBasketValue();
        
        // Total should be (2 * £10.00) = £20.00
        expect(mockState.basket.value).toBe(20.00);
    });
});