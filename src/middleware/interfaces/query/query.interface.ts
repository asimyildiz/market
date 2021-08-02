/**
 * interface to represent a query
 * @interface Query
 */
export interface Query {
  /**
   * selected manufacturer to query
   * @type {?string[]}
   */
  manufacturer?: string[];

  /**
   * selected tags to query
   *  eslint rule is disabled for camelcase
   *  because we use tags_like=1 in query to filter tags from array
   * @type {?string[]}
   */
  // eslint-disable-next-line camelcase
  tags_like?: string[];

  /**
   * selected type to query
   * @type {?string}
   */
  itemType?: string;

  /**
   * selected price min. band to query
   * @type {?number}
   */
  minPrice?: number;

  /**
   * selected price max. band to query
   * @type {?number}
   */
  maxPrice?: number;
}
