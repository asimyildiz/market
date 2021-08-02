import axios from "axios";
import config from "../../config";
import { TagList } from "../interfaces/tag.interface";
import { CompanyList } from "../interfaces/company.interface";
import { ProductList } from "../interfaces/product.interface";
import { ItemTypeList } from "../interfaces/itemtype.interface";
import { Query } from "../interfaces/query/query.interface";
import { Sort } from "../interfaces/query/sort.interface";
import { Pagination } from "../interfaces/query/pagination.interface";
import { toQueryString, urlBuilder } from "../../utils/helpers";

/**
 * fetch list of companies from json-server
 * @returns {Promise<CompanyList>}
 */
export const getCompanies = async (): Promise<CompanyList> => {
  try {
    const { data } = await axios.get(`${config.API_URL}/companies/`);
    return { data };
  } catch (error) {
    return { error };
  }
};

/**
 * fetch list of tags from json-server
 * @returns {Promise<TagList>}
 */
export const getTags = async (): Promise<TagList> => {
  try {
    const { data } = await axios.get(`${config.API_URL}/tags/`);
    return { data };
  } catch (error) {
    return { error };
  }
};

/**
 * fetch list of itemTypes from json-server
 * @returns {Promise<ItemTypeList>}
 */
export const getItemTypes = async (): Promise<ItemTypeList> => {
  try {
    const { data } = await axios.get(`${config.API_URL}/types/`);
    return { data };
  } catch (error) {
    return { error };
  }
};

/**
 * fetch list of products from json-server
 * @param {?Query} query - filter data
 * @param {?Sort} sort - sort data
 * @param {?Pagination} page - limit data
 * @returns {Promise<ProductList>}
 */
export const getProducts = async (
  query?: Query,
  sort?: Sort,
  page?: Pagination
): Promise<ProductList> => {
  try {
    const response = await axios.get(
      urlBuilder(
        `${config.API_URL}/items`,
        toQueryString(query),
        toQueryString(sort),
        toQueryString(page)
      )
    );
    return { data: response.data, count: response.headers["x-total-count"] };
  } catch (error) {
    return { error };
  }
};
