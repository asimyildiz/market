/**
 * list of item types fetched from server
 * @interface ItemTypeList
 */
export interface ItemTypeList {
  /**
   * current request status
   * @type {?string}
   */
  readyStatus?: string;

  /**
   * list of item type data
   * @type {?string[]}
   */
  data?: string[];

  /**
   * error from service call
   * @type {?Error}
   */
  error?: Error;
}
