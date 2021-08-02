import * as _ from "lodash";
import { Cart } from "../middleware/interfaces/cart.interface";

/**
 * template string method to join template literal strings only if non-empty
 * @param {TemplateStringsArray} parts
 * @param {Array<(string | undefined)>} args
 * @returns {string}
 */
function nonEmpty(
  parts: TemplateStringsArray,
  ...args: (string | undefined)[]
): string {
  let result = "";
  parts.forEach((part, i) => {
    result += `${part}${args[i] || ""}`;
    if (i !== 0 && args[i]) {
      result += "&";
    }
  });
  const re = /&$/;
  return result.replace(re, "");
}

/**
 * converts an object to a query string using it's keys
 * which can be used in get requests
 * {_a: 1, b: 2, _c: 3} => _a=1&b=2&_c=3
 * @param {?PlainGenericObject} value - object to convert
 * @returns {string}
 */
export const toQueryString = (value?: PlainGenericObject): string => {
  if (value !== undefined) {
    return Object.keys(value)
      .filter((key) => value[key])
      .map((key) => {
        if (Array.isArray(value[key])) {
          return value[key].map((item: string) => `${key}=${item}`).join("&");
        }
        return `${key}=${value[key]}`;
      })
      .join("&");
  }
  return "";
};

/**
 * url builder to generate an url with querystring
 * using sort and pagination
 * @param {string} url - current url
 * @param {?string} query - current queryfilter
 * @param {?string} sort - current sorting
 * @param {?string} page - current page info
 * @returns {string}
 */
export const urlBuilder = (
  url: string,
  query?: string,
  sort?: string,
  page?: string
): string => nonEmpty`${url}?${query}${sort}${page}`;

/**
 * calculates sum on a list of objects using object's property
 * @param {Cart} data - array of objects to calculate sum on
 * @returns {number} - total (sum)
 */
export const takeSum = (data: Cart | undefined): number => {
  if (data) {
    return Object.keys(data).reduce(
      (sum, key) => sum + data?.[key]?.item?.price * data?.[key]?.count || 0,
      0
    );
  }
  return 0;
};

/**
 * splits an array of objects to a multi-dimensional array
 * based on the size parameter passed to the method
 * ([16], 4) will be [4][4]
 * @param {?_.List<T>} data - data to split
 * @param {number} size - size of every splitted array
 * @returns {T[][]} - multidimensional array
 * @template T
 */
export const chunks = <T>(
  data: _.List<T> | null | undefined,
  size: number
): T[][] => _.chunk(data, size);

/**
 * check if an object has it's property set
 * @param {T} data - object to check
 * @param {string} path - property to check
 * @returns {boolean} - returns true if checked else vice-versa
 * @template T
 */
export const isSelected = <T>(data: T, path: string): boolean =>
  _.result(data, path);

/**
 * sorts an object with type {string: number}
 * based on it's number value
 * @param {?string[]} data - object to sort
 * @returns {_.Dictionary<string>} - returns sorted object
 */
export const order = (data?: string[]): _.Dictionary<string> =>
  _.fromPairs(_.sortBy(_.toPairs(data), 1).reverse());

/**
 * find value using the property from an object
 * @param {_.List<T> | null | undefined} data
 * @param {string} property
 * @param {string} value
 * @returns {T | undefined}
 * @template T
 */
export const getByKey = <T>(
  data: _.List<T> | null | undefined,
  property: string,
  value: string
): T | undefined => _.find(data, { [property]: value } as any);

/**
 * insert a value into an array (unique)
 * if value already exists in the array, does not add it again
 * @param {_.List<string> | null | undefined} data
 * @param {string} value
 * @returns {string[]}
 */
export const insertUnique = (
  data: _.List<string> | null | undefined,
  value: string
): string[] => _.union(data, [value]);

/**
 * removes a value from an array
 * @param {_.List<string>} data
 * @param {string} value
 * @returns {string[]}
 */
export const removeUnique = (data: _.List<string>, value: string): string[] =>
  _.remove(data, (n) => n === value);

/**
 * remove data from an object T using a property and it's value
 * @param {_.List<T>} data
 * @param {string} property
 * @param {string} value
 * @returns {T[]}
 * @template T
 */
export const removeFrom = <T>(
  data: _.List<T>,
  property: string,
  value: string
): T[] => _.remove(data, { [property]: value } as any);
