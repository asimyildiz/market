import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, AppState } from ".";
import { Company, CompanyList } from "../interfaces/company.interface";
import { getCompanies } from "../api";

/**
 * initial state
 * @type {CompanyList}
 */
export const initialState: CompanyList = {
  readyStatus: "invalid",
  data: [],
  error: undefined,
};

/**
 * create reducers and actions
 */
const companyList = createSlice({
  name: "companyList",
  initialState,
  reducers: {
    /**
     * start fetch request action
     * @param {CompanyList} state - current state
     */
    getRequesting: (state: CompanyList) => {
      state.readyStatus = "request";
    },
    /**
     * on fetch request success action
     * @param {CompanyList} state - current state
     * @param {PayloadAction<Company[]>} param0 - current payload
     */
    getSuccess: (state: CompanyList, { payload }: PayloadAction<Company[]>) => {
      state.readyStatus = "success";
      state.data = payload;
    },
    /**
     * on fetch request failure action
     * @param {CompanyList} state - current state
     * @param {PayloadAction<Error>} param0 - current payload
     */
    getFailure: (state: CompanyList, { payload }: PayloadAction<Error>) => {
      state.readyStatus = "failure";
      state.error = payload;
    },
  },
});

export default companyList.reducer;
export const { getRequesting, getSuccess, getFailure } = companyList.actions;

/**
 * fetch list of companies from json-server
 * start fetch request, set readyStatus
 * fetch list of companies
 * end fetch request based on the result
 * @returns {AppThunk}
 * @async
 */
export const fetchCompanyList = (): AppThunk => async (dispatch) => {
  dispatch(getRequesting());

  const { error, data } = await getCompanies();

  if (error) {
    return dispatch(getFailure(error));
  }
  return dispatch(getSuccess(data as Company[]));
};

/**
 * check if we have already made a fetch request to get list of companies
 * we do not need to do another request, so we check against readyStatus
 * if it is success or not
 * @param {AppState} state - general state
 * @returns {boolean}
 */
const shouldFetchCompanyList = (state: AppState): boolean =>
  state.companyList.readyStatus !== "success";

/**
 * if we did not make a fetch request to get list of companies
 * then start a new request
 * @returns {AppThunk}
 */
export const fetchCompanyListIfNeed = (): AppThunk => (dispatch, getState) => {
  if (shouldFetchCompanyList(getState())) {
    return dispatch(fetchCompanyList());
  }

  return null;
};
