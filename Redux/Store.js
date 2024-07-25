// Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartRedux';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
