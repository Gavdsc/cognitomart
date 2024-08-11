import { MergeClasses } from "../../src/common/utilities";

describe('MergeClasses', () => {
    test('should join multiple class names into a single string', () => {
        const result = MergeClasses('class1', 'class2', 'class3');
        
        expect(result).toBe('class1 class2 class3');
    });

    test('should remove falsey values from the class list', () => {
        const result = MergeClasses('class1', '', 'class2', 'class3');
        
        expect(result).toBe('class1 class2 class3');
    });

    test('should return a single class name when only one valid class is provided', () => {
        const result = MergeClasses('class1');
        
        expect(result).toBe('class1');
    });

    test('should return an empty string when all provided values are falsey', () => {
        const result = MergeClasses('');
        
        expect(result).toBe('');
    });

    test('should return an empty string when no class names are provided', () => {
        const result = MergeClasses();
        
        expect(result).toBe('');
    });
});