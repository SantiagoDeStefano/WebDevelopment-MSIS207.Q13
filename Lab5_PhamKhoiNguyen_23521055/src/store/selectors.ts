import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const selectCartState = (state: RootState) => state.cart;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;

export const selectCartTax = createSelector(
  [selectCartTotalAmount],
  (totalAmount) => {
    // runs only when totalAmount changes
    return Math.round(totalAmount * 0.1 * 100) / 100; // round to 2 decimals
  }
);
