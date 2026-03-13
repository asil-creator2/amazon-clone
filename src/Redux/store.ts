import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

import ThemeReducer from "./slices/ThemeSlice"
import CartReducer from "./slices/cartSlice"
import SearchReducer from "./slices/searchSlice"
import FavoriteReducer from "./slices/favoritesSlice"

const persistCartConfig = {
  key: "cart",
  storage,
}

const persistFavConfig = {
  key: "favorites",
  storage,
}

const persistedCartReducer = persistReducer(persistCartConfig, CartReducer)
const persistedFavoritesReducer = persistReducer(persistFavConfig, FavoriteReducer)

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    cart: persistedCartReducer,
    search: SearchReducer,
    favorites: persistedFavoritesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch