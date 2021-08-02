import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, AppState } from ".";
import { TagList } from "../interfaces/tag.interface";
import { getTags } from "../api";

/**
 * initial state
 * @type {TagList}
 */
export const initialState: TagList = {
  readyStatus: "invalid",
  data: [],
  error: undefined,
};

/**
 * create reducers and actions
 */
const tagList = createSlice({
  name: "tagList",
  initialState,
  reducers: {
    /**
     * start fetch request action
     * @param {TagList} state - current state
     */
    getRequesting: (state: TagList) => {
      state.readyStatus = "request";
    },
    /**
     * on fetch request success action
     * @param {TagList} state - current state
     * @param {PayloadAction<string[]>} param0 - current payload
     */
    getSuccess: (state: TagList, { payload }: PayloadAction<string[]>) => {
      state.readyStatus = "success";
      state.data = payload;
    },
    /**
     * on fetch request failure action
     * @param {TagList} state - current state
     * @param {PayloadAction<Error>} param0 - current payload
     */
    getFailure: (state: TagList, { payload }: PayloadAction<Error>) => {
      state.readyStatus = "failure";
      state.error = payload;
    },
  },
});

export default tagList.reducer;
export const { getRequesting, getSuccess, getFailure } = tagList.actions;

/**
 * fetch list of tags from json-server
 * start fetch request, set readyStatus
 * fetch list of tags
 * end fetch request based on the result
 * @returns {AppThunk}
 * @async
 */
export const fetchTagList = (): AppThunk => async (dispatch) => {
  dispatch(getRequesting());

  const { error, data } = await getTags();

  if (error) {
    return dispatch(getFailure(error));
  }
  return dispatch(getSuccess(data as string[]));
};

/**
 * check if we have already made a fetch request to get list of tags
 * we do not need to do another request, so we check against readyStatus
 * if it is success or not
 * @param {AppState} state - general state
 * @returns {boolean}
 */
const shouldFetchTagList = (state: AppState) =>
  state.tagList.readyStatus !== "success";

/**
 * if we did not make a fetch request to get list of tags
 * then start a new request
 * @returns {AppThunk}
 */
export const fetchTagListIfNeed = (): AppThunk => (dispatch, getState) => {
  if (shouldFetchTagList(getState())) {
    return dispatch(fetchTagList());
  }

  return null;
};
