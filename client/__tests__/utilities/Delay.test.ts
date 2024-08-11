import { Delay } from "../../src/common/utilities";

describe('Delay', () => {
    // Setup fake timers
    jest.useFakeTimers();

    // Allow for slight timing variations
    const _tolerance: number = 50;

    test('should resolve after the delay', () => {
        const delayMs: number = 1000;
        const start: number = Date.now();
        
        // Immediately invoked async function to await the delay.
        (async () => {
            await Delay(delayMs).then(() => {
                const end = Date.now();
                const elapsed = end - start;

                // Check if the elapsed time is within tolerance
                expect(elapsed).toBeGreaterThanOrEqual(delayMs - _tolerance);
                expect(elapsed).toBeLessThanOrEqual(delayMs + _tolerance);
            });
        })();
    });

    test('should resolve when delay is 0', () => {
        const start: number = Date.now();

        // Immediately invoked async function to await the delay.
        (async () => {
            await Delay(0).then(() => {
                const end = Date.now();
                const elapsed = end - start;

                // Check if the elapsed time is within tolerance
                expect(elapsed).toBeLessThan(_tolerance);
            });
        })();
    });
});