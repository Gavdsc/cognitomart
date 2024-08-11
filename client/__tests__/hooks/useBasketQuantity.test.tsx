import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import useBasketQuantity from '../../src/hooks/useBasketQuantity';

import mockState from "../../__mocks__/state/mockStore";

// Mock the state using the mock store.
jest.mock('@/state/store', () => {

    // Require the actual state so we can manipulate it later.
    const state = jest.requireActual("../../__mocks__/state/mockStore");

    return {
        __esModule: true,
        default: state.default
    }
})

describe('useBasketQuantity', () => {
    
    beforeEach(() => {
        // Clear the basket before each test.
        mockState.basket.items.clear();
    });
    
    test('should return 0 when the basket is empty', () => {
        // Render with mocked state.
        const { result } = renderHook(() => useBasketQuantity());

        // Check if the quantity is 0.
        expect(result.current).toBe(0);
    });

    test('should correctly sum up the quantities in the basket', () => {
        // Add some basket items.
        act(() => {
            mockState.basket.items.set(1, 3);
            mockState.basket.items.set(2, 5);
        });

        // Create the render hook.
        const { result } = renderHook(() => useBasketQuantity());
        
        // Check if the quantity is equal to the items.
        expect(result.current).toBe(8);
    });

    test('should update the quantity when basket items change', () => {
        // Render.
        const { result, rerender } = renderHook(() => useBasketQuantity());
        
        // Check the initial value.
        expect(result.current).toBe(0);

        // Update state.
        act(() => mockState.basket.items.set(1, 10));

        // Re-render to get the update.
        rerender();

        // Check the updated value.
        expect(result.current).toBe(10);
    });
});