import * as React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import QuantityPicker from '../../src/components/QuantityPicker';

describe('QuantityPicker', () => {
    // Setup fake timers
    jest.useFakeTimers();
    
    // Empty mock function for the callback.
    const mockCallback = jest.fn();

    beforeEach(() => {
        // Clear the mocks before running again.
        jest.clearAllMocks();
    });
    
    test('renders no quantity with correct visual', () => {
        render(<QuantityPicker quantity={0} min={0} max={10} callback={mockCallback}/>);

        // Check that the add button is displayed.
        expect(screen.getByText('Add')).toBeInTheDocument();
    });

    test('renders quantity above 0 with correct visual', () => {
        render(<QuantityPicker quantity={5} min={0} max={10} callback={mockCallback}/>);

        // Check that the quantity input displays with + and - buttons.
        expect(screen.getByDisplayValue('5')).toBeInTheDocument();
        expect(screen.getByText('+')).toBeInTheDocument();
        expect(screen.getByText('-')).toBeInTheDocument();
    });

    test('increments quantity on + button click', () => {
        render(<QuantityPicker quantity={5} min={0} max={10} callback={mockCallback} />);

        fireEvent.click(screen.getByText('+'));

        // Increase from 5 to 6.
        expect(mockCallback).toHaveBeenCalledWith(6);
        expect(mockCallback).toBeCalledTimes(1);
    });

    test('decrements quantity on - button click', () => {
        render(<QuantityPicker quantity={5} min={0} max={10} callback={mockCallback} />);

        fireEvent.click(screen.getByText('-'));

        // Decrease from 5 to 4.
        expect(mockCallback).toHaveBeenCalledWith(4);
        expect(mockCallback).toBeCalledTimes(1);
    });
    
    test('value increase debounces on input change', () => {
        render(<QuantityPicker quantity={5} min={0} max={10} callback={mockCallback} />);

        const input: HTMLInputElement = screen.getByDisplayValue('5');

        fireEvent.change(input, { target: { value: '2' } });

        expect(mockCallback).toBeCalledTimes(0);

        jest.advanceTimersByTime(300);

        expect(mockCallback).toHaveBeenCalledWith(2);
    });

    test('clamps quantity to min and max values', () => {
        render(<QuantityPicker quantity={5} min={1} max={10} callback={mockCallback} />);
        
        const input: HTMLInputElement = screen.getByDisplayValue('5');

        fireEvent.change(input, { target: { value: '0' } });
        
        // Wait for debounce
        jest.advanceTimersByTime(300);
        
        expect(mockCallback).toHaveBeenCalledWith(1); // Clamped to min value
        
        fireEvent.change(input, { target: { value: '15' } });
        
        // Wait for debounce
        jest.advanceTimersByTime(300);
        
        expect(mockCallback).toHaveBeenCalledWith(10); // Clamped to max value
    });

    test('prevents non-numeric input keys', () => {
        const { container } = render(<QuantityPicker quantity={5} min={0} max={10} callback={mockCallback} />);

        const input = container.querySelector('input');

        if (input) {
            fireEvent.keyDown(input, { key: 'a', code: 'KeyA', charCode: 65 });

            // Check that the input value has not changed.
            expect(input).toHaveValue('5'); 
        }
    });

    test('increases quantity with ArrowUp key and decreases with ArrowDown key', () => {
        render(<QuantityPicker quantity={5} min={0} max={10} callback={mockCallback} />);

        const input = screen.getByDisplayValue('5');
        
        fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
        
        expect(mockCallback).toHaveBeenCalledWith(6);

        fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
        
        expect(mockCallback).toHaveBeenCalledWith(4);
    });
});