/**
 * interface to represent a pagination
 * @interface Pagination
 */
export interface Pagination {
  /**
   * page information to start fetching
   * data starting from page number
   * @type {?number}
   */
  _page?: number;

  /**
   * limit information to get number of items
   * for that page
   * @type {?number}
   */
  _limit?: number;
}
