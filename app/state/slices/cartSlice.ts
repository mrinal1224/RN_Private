import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./productsSlice";
import type { RootState } from "../store";

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: Record<string, CartItem>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existing = state.items[product.id];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.id] = {
          ...product,
          quantity: 1,
        };
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existing = state.items[id];
      if (!existing) return;

      if (existing.quantity <= 1) {
        delete state.items[id];
      } else {
        existing.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => Object.values(state.cart.items);
export const selectCartItemById = (state: RootState, id: string) => state.cart.items[id];
export const selectCartTotalQuantity = (state: RootState) =>
  Object.values(state.cart.items).reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
  Object.values(state.cart.items).reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;


