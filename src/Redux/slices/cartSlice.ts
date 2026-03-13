import { createSlice } from "@reduxjs/toolkit";

type str = string
type int = number

interface Product {
    id: int
    title: str
    description: str
    price: int
    thumbnail: str
    category: str
    reviews: Review[],
    quantity : int,
}

interface Review {
    rating: int;
    comment : str;
    date : str;
    reviewerName : str;
    reviewerEmail : str;
}
const CartSlice = createSlice({
    name: 'themeSlice',
    initialState: {
        products: [] as Product[]

    },
    reducers: {
        addToCart: (state , action) => {
            console.log(action.payload);
            
            const item : Product | undefined = state.products.find((product : Product)  => product.id === action.payload.id)
            if (item) { item.quantity ++} 
            else {state.products.push(action.payload)}
        },
        increment : (state,action) => {
            const item : Product | undefined = state.products.find((product : Product)  => product.id === action.payload.id)
            if (item) { item.quantity ++} 
        },
        decrement : (state,action) => {
            const item : Product | undefined = state.products.find((product : Product)  => product.id === action.payload.id)
            if (item && item.quantity > 1) { item.quantity --} 
            else if (item && item.quantity === 1) { item.quantity = 1}

        },
        removeItem(state,action){
            const item : Product | undefined = state.products.find((product : Product)  => product.id === action.payload.id)
            if (item) {state.products.splice(state.products.indexOf(item), 1)}
        },
        clearCart(state){
            state.products = []
        }

    }
});

export const {addToCart,decrement,increment,removeItem,clearCart} = CartSlice.actions
export default CartSlice.reducer