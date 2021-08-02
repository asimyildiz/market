/**
 * interface to represent an product
 * @interface Product
 */
export interface Product {
  /**
   * tags that represents the product
   * @type {string[]}
   */
  tags: string[];

  /**
   * product's price
   * @type {number}
   */
  price: number;

  /**
   * product's name
   * @type {string}
   */
  name: string;

  /**
   * product's descriptiojn
   * @type {string}
   */
  description: string;

  /**
   * product's url slug
   * @type {string}
   */
  slug: string;

  /**
   * product's date created info (timestamp)
   * @type {Date}
   */
  added: Date;

  /**
   * product's manufacturer
   * @type {string}
   */
  manufacturer: string;

  /**
   * product's type (mug-shirt)
   * @type {string}
   */
  itemType: string;
}

/**
 * list of products fetched from server
 * @interface ProductList
 */
export interface ProductList {
  /**
   * current request status
   * @type {?string}
   */
  readyStatus?: string;

  /**
   * list of products data
   * @type {?Product[]}
   */
  data?: Product[];

  /**
   * number of products
   * @type {number}
   */
  count?: number;

  /**
   * error from service call
   * @type {?Error}
   */
  error?: Error;
}
