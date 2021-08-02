import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { Product } from "../interfaces/product.interface";
import { Cart } from "../interfaces/cart.interface";

/**
 * create reducers and actions
 */
const cart = createSlice({
  name: "cart",
  initialState: {} as Cart,
  reducers: {
    /**
     * adds a product into current basket action
     * if this product is not added to the basket before add it
     * if this product is added to the basket before only increase count
     * @param {Cart} state - current state
     * @param {PayloadAction<Product>} param0 - product to be added into basket
     * @async
     */
    onAddToCart: (state: Cart, { payload }: PayloadAction<Product>) => {
      const currentItem = state[payload.slug];
      if (currentItem === undefined) {
        state[payload.slug] = { item: payload, count: 1 };
      } else {
        state[payload.slug].count += 1;
      }
    },
    /**
     * removes a product from current basket action
     * if this product is added to the basket before and there is only 1, remove it
     * if this product is added to the basket before and there is more than 1, then decrease count
     * @param {Cart} state - current state
     * @param {PayloadAction<Product>} param0 - product to be added into basket
     * @async
     */
    onRemoveFromCart: (state: Cart, { payload }: PayloadAction<Product>) => {
      const currentItem = state[payload.slug];
      if (currentItem?.item !== undefined && currentItem?.count === 1) {
        delete state[payload.slug];
      } else {
        state[payload.slug].count -= 1;
      }
    },
  },
});

export default cart.reducer;
export const { onAddToCart, onRemoveFromCart } = cart.actions;

/**
 * adds a product into current basket
 * if this product is not added to the basket before add it
 * if this product is added to the basket before only increase count
 * @param {Product} data - product to be added into basket
 * @returns {AppThunk}
 * @async
 */
export const addToCart =
  (data: Product): AppThunk =>
  async (dispatch) =>
    dispatch(onAddToCart(data));

/**
 * removes a product from current basket
 * if this product is added to the basket before and there is only 1, remove it
 * if this product is added to the basket before and there is more than 1, then decrease count
 * @param {Product} data - product to be added into basket
 * @returns {AppThunk}
 * @async
 */
export const removeFromCart =
  (data: Product): AppThunk =>
  async (dispatch) =>
    dispatch(onRemoveFromCart(data));
