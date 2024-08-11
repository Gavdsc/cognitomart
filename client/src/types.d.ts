interface AppState {
    products: proxyMap<number, Product>,
    basket: BasketState
}

interface Product {
    id: number, 
    name: string, 
    description: string, 
    price: number
}

interface LibraryComponent {
    className?: string
}

interface BasketState {
    items: Map<number, number>,
    value: number
}