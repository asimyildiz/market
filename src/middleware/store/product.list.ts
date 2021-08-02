import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { getProducts } from "../api";
import { Product, ProductList } from "../interfaces/product.interface";
import { Query } from "../interfaces/query/query.interface";
import { Sort } from "../interfaces/query/sort.interface";
import { Pagination } from "../interfaces/query/pagination.interface";

/**
 * interface to represent a success request which includes
 * list of products fetched from server
 * with the count of all products on server
 * @interface Success
 */
interface Success {
  /**
   * products fetched from server
   * @type {Product[]]}
   */
  data: Product[];
  /**
   * total number of products that exist on json-server
   * @type {number}
   */
  count: number;
}

/**
 * initial state
 * @type {ProductList}
 */
export const initialState: ProductList = {
  readyStatus: "invalid",
  data: [],
  count: 0,
  error: undefined,
};

/**
 * create reducers and actions
 */
const productList = createSlice({
  name: "productList",
  initialState,
  reducers: {
    /**
     * start fetch request action
     * @param {ProductList} state - current state
     */
    getRequesting: (state: ProductList) => {
      state.readyStatus = "request";
    },
    /**
     * on fetch request success action
     * @param {ProductList} state - current state
     * @param {PayloadAction<Success>} param0 - current payload
     */
    getSuccess: (state: ProductList, { payload }: PayloadAction<Success>) => {
      state.readyStatus = "success";
      state.data = payload.data;
      state.count = payload.count;
    },
    /**
     * on fetch request failure action
     * @param {ProductList} state - current state
     * @param {PayloadAction<Error>} param0 - current payload
     */
    getFailure: (state: ProductList, { payload }: PayloadAction<Error>) => {
      state.readyStatus = "failure";
      state.error = payload;
    },
  },
});

export default productList.reducer;
export const { getRequesting, getSuccess, getFailure } = productList.actions;

/**
 * fetch list of products from json-server on the go (no SSR)
 * start fetch request, set readyStatus
 * fetch list of itemTypes using query, sort and page filters
 * end fetch request based on the result
 * @param {?Query} query - filter data using query
 * @param {?Sort} sort - sorting property
 * @param {Pagination} page - limit query
 * @returns {AppThunk}
 * @async
 */
export const fetchProductList =
  (query?: Query, sort?: Sort, page: Pagination = { _limit: 16 }): AppThunk =>
  async (dispatch) => {
    dispatch(getRequesting());

    const { error, data, count } = await getProducts(query, sort, page);
    if (error) {
      return dispatch(getFailure(error));
    }
    return dispatch(getSuccess({ data: data as Product[], count: count || 0 }));
  };
