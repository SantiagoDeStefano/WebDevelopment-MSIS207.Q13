import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  price: number;   // per unit
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalAmount: number;
};

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

type AddItemPayload = {
  id: string;
  title: string;
  price: number;
};

type RemoveItemPayload = {
  id: string;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<AddItemPayload>) {
      const { id, title, price } = action.payload;
      const existing = state.items.find((i) => i.id === id);

      state.totalAmount += price;

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id, title, price, quantity: 1 });
      }
    },

    removeItem(state, action: PayloadAction<RemoveItemPayload>) {
      const { id } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return; // nothing to do

      state.totalAmount -= existing.price;

      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== id);
      }

      // Guard against floating point nonsense / negatives
      if (state.totalAmount < 0) state.totalAmount = 0;
    },

    clearCart() {
      return initialState;
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
