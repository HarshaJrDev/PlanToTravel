// Redux/CartRedux.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    favorites: [],
  },
  reducers: {
    incrementcart: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(item => item._id !== action.payload);
    },
  },
});

export const { incrementcart, removeFavorite } = cartSlice.actions;
export default cartSlice.reducer;
