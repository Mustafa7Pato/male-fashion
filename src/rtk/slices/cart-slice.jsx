import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  initialState: [],
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const itemExists = state.find((item) => item.id === itemToAdd.id);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.push({ ...itemToAdd, quantity: 1 });
      }
    },
    deleteFromCart: (state, action) => {
      const idToRemove = action.payload.id;
      return state.filter((product) => product.id !== idToRemove);
    },
    increaseItem: (state, action) => {
      const { id } = action.payload;
      const product = state.find((product) => product.id === id);
      if (product) {
        product.quantity += 1;
      } else {
        console.log("not-Found");
      }
    },
    decreaseItem: (state, action) => {
      const { id } = action.payload;
      const product = state.find((product) => product.id === id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addToCart, deleteFromCart, decreaseItem, increaseItem } =
  cartSlice.actions;
export default cartSlice.reducer;
