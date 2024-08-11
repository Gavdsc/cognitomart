/**
 * Simple class merges without a third party plugin.
 * @param classList - An array of classnames.
 */
export const MergeClasses = (...classList: string[]): string => classList.filter(Boolean).join(" ");

/**
 * Simple debouncing function.
 * @param callback - The callback to debounce.
 * @param wait - The debounce delay.
 * @constructor
 */
export const SimpleDebounce = (callback: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), wait);
    };
}

/**
 * Clamps passed value between a max and min.
 * @param value - The value to clamp.
 * @param min - The min value.
 * @param max - The max value.
 * @constructor
 */
export const Clamp = (value: number, min: number, max: number): number => Math.max(Math.min(value, max), min);

/**
 * Delays the current thread for visual testing purposes.
 * @param ms - The time in ms to delay.
 * @constructor
 */
export const Delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));