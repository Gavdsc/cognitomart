import { SimpleDebounce } from "../../src/common/utilities";

describe('SimpleDebounce', () => {
    // Setup fake timers
    jest.useFakeTimers(); 

    test('should call the debounced function after the wait time', () => {
        const mock = jest.fn();
        const debounced = SimpleDebounce(mock, 1000);

        // Throw in some test args
        debounced('arg1', 'arg2');

        // Check that the function is not called immediately
        expect(mock).not.toHaveBeenCalled();

        // Forward time by 1000ms.
        jest.advanceTimersByTime(1000);

        // Check that the function has been called (after the waiting).
        expect(mock).toHaveBeenCalledWith('arg1', 'arg2');
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test('should cancel previous timeout and reset the function call if invoked again', () => {
        const mock = jest.fn();
        const debounced = SimpleDebounce(mock, 1000);

        // Call twice. Arg2 should be the called value.
        debounced('arg1');
        debounced('arg2'); 

        // Forward time by 1000ms.
        jest.advanceTimersByTime(1000);

        // Check that the function is only called once with the last argument.
        expect(mock).toHaveBeenCalledWith('arg2');
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple delayed calls with different arguments', () => {
        const mock = jest.fn();
        const debounced = SimpleDebounce(mock, 500);

        debounced('first');

        // First delay.
        jest.advanceTimersByTime(200);
        
        debounced('second');

        // Second delay.
        jest.advanceTimersByTime(300);

        debounced('third');

        // Forward time by 500ms to end.
        jest.advanceTimersByTime(500);

        // Check the function is only called once with the last argument.
        expect(mock).toHaveBeenCalledWith('third');
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test('should handle no arguments and no wait time', () => {
        const mock = jest.fn();
        const debounced = SimpleDebounce(mock, 0);

        debounced();

        // Forward time by 0ms.
        jest.advanceTimersByTime(0);

        // Check the function is called immediately.
        expect(mock).toHaveBeenCalledWith();
        expect(mock).toHaveBeenCalledTimes(1);
    });
});