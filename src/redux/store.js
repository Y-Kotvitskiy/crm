import { configureStore } from '@reduxjs/toolkit'
import productCardReducer from './slices/productCartSlice'

export const store = configureStore({
  reducer: {
    productCart: productCardReducer
  },
})