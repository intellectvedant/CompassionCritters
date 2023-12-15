import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.product];
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload.productId;
      state.cart = state.cart.filter(
        (item) => item.product_id !== productIdToRemove
      );
    },
    clearCart: (state, action) => {
        state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
