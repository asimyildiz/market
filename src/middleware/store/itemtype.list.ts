import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, AppState } from ".";
import { ItemTypeList } from "../interfaces/itemtype.interface";
import { getItemTypes } from "../api";

/**
 * initial state
 * @type {ItemTypeList}
 */
export const initialState: ItemTypeList = {
  readyStatus: "invalid",
  data: [],
  error: undefined,
};

/**
 * create reducers and actions
 */
const itemtypeList = createSlice({
  name: "itemTypeList",
  initialState,
  reducers: {
    /**
     * start fetch request action
     * @param {ItemTypeList} state - current state
     */
    getRequesting: (state: ItemTypeList) => {
      state.readyStatus = "request";
    },
    /**
     * on fetch request success action
     * @param {ItemTypeList} state - current state
     * @param {PayloadAction<string[]>} param0 - current payload
     */
    getSuccess: (state: ItemTypeList, { payload }: PayloadAction<string[]>) => {
      state.readyStatus = "success";
      state.data = payload;
    },
    /**
     * on fetch request failure action
     * @param {ItemTypeList} state - current state
     * @param {PayloadAction<Error>} param0 - current payload
     */
    getFailure: (state: ItemTypeList, { payload }: PayloadAction<Error>) => {
      state.readyStatus = "failure";
      state.error = payload;
    },
  },
});

export default itemtypeList.reducer;
export const { getRequesting, getSuccess, getFailure } = itemtypeList.actions;

/**
 * fetch list of itemTypes from json-server
 * start fetch request, set readyStatus
 * fetch list of itemTypes
 * end fetch request based on the result
 * @returns {AppThunk}
 * @async
 */
export const fetchItemTypes = (): AppThunk => async (dispatch) => {
  dispatch(getRequesting());

  const { error, data } = await getItemTypes();

  if (error) {
    return dispatch(getFailure(error));
  }

  return dispatch(getSuccess(data as string[]));
};

/**
 * check if we have already made a fetch request to get list of itemTypes
 * we do not need to do another request, so we check against readyStatus
 * if it is success or not
 * @param {AppState} state - general state
 * @returns {boolean}
 */
const shouldFetchItemTypes = (state: AppState): boolean =>
  state.productList.readyStatus !== "success";

/**
 * if we did not make a fetch request to get list of itemTypes
 * then start a new request
 * @returns {AppThunk}
 */
export const fetchItemTypesIfNeeded = (): AppThunk => (dispatch, getState) => {
  if (shouldFetchItemTypes(getState())) {
    return dispatch(fetchItemTypes());
  }

  return null;
};
