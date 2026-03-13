import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {ProductHome} from '../../Types/interfaces'

interface FavoritesState {
    favorites: ProductHome[]
}

const initialState: FavoritesState = {
    favorites : []
}

const favoritesSlice = createSlice({
    name : 'favorites',
    initialState,
    reducers : {
        toggleFavorites : (state: FavoritesState, action: PayloadAction<ProductHome>) : void => {
            console.log(action.payload)
            const item = state.favorites.find((product: ProductHome) => product.id === action.payload.id)
            if (item) {state.favorites.splice(state.favorites.indexOf(item), 1)}
            else if (!item) {state.favorites.push(action.payload)}

        },
    }
})

export const {toggleFavorites} = favoritesSlice.actions
export default favoritesSlice.reducer