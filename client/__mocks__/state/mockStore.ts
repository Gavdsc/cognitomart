import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface MockProduct {
    id: number, 
    name: string, 
    price: number
}

export interface MockState {
    basket: {
        items: Map<number, number>,
        value: number
    },
    products: Map<number, MockProduct>,
}

// Define the mock state structure
const mockState: MockState = proxy<MockState>({
    basket: {
        items: proxyMap<number, number>(),
        value: 0
    },
    products: proxyMap<number, MockProduct>(),
});

export default mockState;