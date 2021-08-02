/**
 * interface to represent a company
 * @interface Company
 */
export interface Company {
  /**
   * company's url slug
   * @type {string}
   */
  slug: string;

  /**
   * company's name
   * @type {string}
   */
  name: string;

  /**
   * company's address
   * @type {string}
   */
  address: string;

  /**
   * city that company resides
   * @type {string}
   */
  city: string;

  /**
   * state that company resides
   * @type {string}
   */
  state: string;

  /**
   * company's zip code
   * @type {string}
   */
  zip: string;

  /**
   * company's account number
   * @type {number}
   */
  account: number;

  /**
   * company's contact person
   * @type {string}
   */
  contact: string;
}

/**
 * list of companies data fetched from server
 * @interface CompanyList
 */
export interface CompanyList {
  /**
   * current request status
   * @type {?string}
   */
  readyStatus?: string;

  /**
   * list of companies data
   * @type {?Company[]}
   */
  data?: Company[];

  /**
   * error from service call
   * @type {?Error}
   */
  error?: Error;
}
