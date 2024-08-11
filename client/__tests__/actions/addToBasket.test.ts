import * as Actions from "../../src/state/actions";

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

describe('addToBasket', () => {
    let updateBasketValueSpy: jest.SpyInstance;
    
    beforeEach(() => {
        // Reset the state before each test
        mockState.basket.items.clear();
        mockState.basket.value = 0;

        // Spy on the updateBasketValue function
        updateBasketValueSpy = jest.spyOn(Actions, 'updateBasketValue');
    });

    afterEach(() => {
        // Clear mock data after each test
        updateBasketValueSpy.mockClear();
    });

    test('should add a product to the basket with the correct quantity', () => {
        // Adding a product to the basket
        Actions.addToBasket(1, 2);
        
        expect(mockState.basket.items.has(1)).toBe(true);
        expect(mockState.basket.items.get(1)).toBe(2);
        expect(Actions.updateBasketValue).toHaveBeenCalled();
    });

    test('should update the quantity of an existing product in the basket', () => {
        // Set product 1 basket quantity to 2
        mockState.basket.items.set(1, 2);

        // Update the product quantity to 5
        Actions.addToBasket(1, 5);
        
        expect(mockState.basket.items.get(1)).toBe(5);
        expect(Actions.updateBasketValue).toHaveBeenCalled();
    });

    test('should remove a product from the basket when quantity is set to 0', () => {
        // Set product 1 basket quantity to 2
        mockState.basket.items.set(1, 2);

        // Set quantity to 0 to remove product 1
        Actions.addToBasket(1, 0);

        // Expectations
        expect(mockState.basket.items.has(1)).toBe(false);
        expect(Actions.updateBasketValue).toHaveBeenCalled();
    });

    test('should not add a product if quantity is 0 and it does not already exist in the basket', () => {
        // Add a product with quantity 0
        Actions.addToBasket(1, 0);
        
        expect(mockState.basket.items.has(1)).toBe(false);
        expect(Actions.updateBasketValue).not.toHaveBeenCalled();
    });

    test('should correctly handle adding multiple different products', () => {
        // Add product 1 with quantity 2
        Actions.addToBasket(1, 2);
        // Add product 2 with quantity 3
        Actions.addToBasket(2, 3);
        
        expect(mockState.basket.items.has(1)).toBe(true);
        expect(mockState.basket.items.get(1)).toBe(2);
        expect(mockState.basket.items.has(2)).toBe(true);
        expect(mockState.basket.items.get(2)).toBe(3);
        expect(Actions.updateBasketValue).toHaveBeenCalledTimes(2);
    });
});