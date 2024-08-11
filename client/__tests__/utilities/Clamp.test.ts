import { Clamp } from '../../src/common/utilities';

describe('Clamp', () => {
    test('should return the value if it is within the range', () => {
        expect(Clamp(5, 1, 10)).toBe(5);
        expect(Clamp(7, 1, 10)).toBe(7);
    });

    test('should return the minimum if the value is less than the minimum', () => {
        expect(Clamp(0, 1, 10)).toBe(1);
        expect(Clamp(-5, 0, 10)).toBe(0);
    });

    test('should return the maximum if the value is greater than the maximum', () => {
        expect(Clamp(15, 1, 10)).toBe(10);
        expect(Clamp(20, 10, 15)).toBe(15);
    });

    test('should return the minimum or maximum if value is equal to minimum or maximum', () => {
        expect(Clamp(1, 1, 10)).toBe(1);
        expect(Clamp(10, 1, 10)).toBe(10);
    });

    test('should handle edge case where minimum and maximum are the same', () => {
        expect(Clamp(5, 5, 5)).toBe(5);
        expect(Clamp(4, 5, 5)).toBe(5);
        expect(Clamp(6, 5, 5)).toBe(5);
    });
});