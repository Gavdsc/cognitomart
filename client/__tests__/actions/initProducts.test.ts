import { fetchProducts } from "../../src/state/fetch";
import * as Actions from "../../src/state/actions";

import mockState, { MockProduct } from "../../__mocks__/state/mockStore";

// Mocking the state
jest.mock('@/state/store', () => {

    // Require the actual state so we can manipulate it later.
    const state = jest.requireActual("../../__mocks__/state/mockStore");

    return {
        __esModule: true,
        default: state.default
    }
})

// Mock the fetch because testing is local
jest.mock('../../src/state/fetch');

describe('initProducts', () => {
    let staleProductHandleSpy: jest.SpyInstance;
    let updateBasketValueSpy: jest.SpyInstance;
    
    beforeEach(() => {
        // Reset the state before each test
        mockState.basket.items.clear();
        mockState.basket.value = 0;
        mockState.products.clear();
        
        // Set spy so not having to mock the functions
        staleProductHandleSpy = jest.spyOn(Actions, 'staleProductHandle');
        updateBasketValueSpy = jest.spyOn(Actions, 'updateBasketValue');
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should fetch products and initialise the products map', async () => {
        // Mock products
        const mockProducts: MockProduct[] = [
            {id: 1, name: 'Product 1', price: 10.0},
            {id: 2, name: 'Product 2', price: 20.0}
        ];
        
        // Pass as resolved
        (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

        await Actions.initProducts();

        expect(fetchProducts).toHaveBeenCalledTimes(1);
        // Note: proxyMap returns as an object
        expect(mockState.products).toBeInstanceOf(Object);
        expect(mockState.products.size).toBe(2);
        expect(mockState.products.get(1)).toEqual(mockProducts[0]);
        expect(mockState.products.get(2)).toEqual(mockProducts[1]);
    });


    test('should handle stale products if products are fetched', async () => {
        // Mock products
        const mockProducts: MockProduct[] = [
            { id: 1, name: 'Product 1', price: 10.0 }
        ];

        // Pass as resolved
        (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

        await Actions.initProducts();

        expect(staleProductHandleSpy).toHaveBeenCalledTimes(1);
    });

    test('should not handle stale products if no products are fetched', async () => {
        // Mock products
        const mockProducts: MockProduct[] = [];

        // Pass as resolved
        (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

        await Actions.initProducts();

        expect(staleProductHandleSpy).not.toHaveBeenCalled();
    });

    test('should update the basket value after initialising products', async () => {
        // Mock products
        const mockProducts: MockProduct[] = [
            { id: 1, name: 'Product 1', price: 10.0 }
        ];

        // Pass as resolved
        (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

        await Actions.initProducts();
        
        expect(updateBasketValueSpy).toHaveBeenCalledTimes(1);
    });
});