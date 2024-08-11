import { proxy, subscribe } from 'valtio';
import { proxyMap } from 'valtio/utils';
import { MapReplacer, ProxyMapReviver } from "@/common/json";
import { initProducts } from "@/state/actions";

// Retrieve session items or set a new proxyMap.
const sessionBasket: string | null = sessionStorage.getItem('basketItems');
const items = sessionBasket != null ? JSON.parse(sessionBasket, ProxyMapReviver) : proxyMap<number,  number>();

// Instantiate the initial state using a promise to initialise the products Map.
const state: AppState = proxy<AppState>({
    products: initProducts(),
    basket: {
        items: items,
        value: 0
    }
});

// Use vanilla Valtio to subscribe to basket updates and update the session storage.
subscribe(state.basket.items, () => 
    sessionStorage.setItem('basketItems', JSON.stringify(new Map(state.basket.items), MapReplacer))
);

export default state;