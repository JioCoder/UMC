// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice';  // cartReducer를 import

// Redux Toolkit을 사용하여 store 생성
export const store = configureStore({
  reducer: { cart: cartReducer }  // cart 슬라이스를 reducer로 설정
});

