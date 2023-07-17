import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products-slice";
import cart from "./slices/cart-slice";

export const store = configureStore({
  reducer: {
    products,
    cart,
  },
});
