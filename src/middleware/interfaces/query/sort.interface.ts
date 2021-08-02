/* eslint-disable no-shadow */
/**
 * enum that represents the order
 * asc for ascending and desc for descending
 */
export enum Order {
  /**
   * ASC
   * @type {string}
   */
  ASC = "asc",

  /**
   * DESC
   * @type {string}
   */
  DESC = "desc",
}

/**
 * interface to represent a sort
 * @interface Sort
 */
export interface Sort {
  /**
   * sort field information
   * @type {?string}
   */
  _sort?: string;

  /**
   * order field information
   * @type {?string}
   */
  _order?: Order;
}
