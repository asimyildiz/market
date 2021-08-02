/**
 * list of tags fetched from server
 * @interface TagList
 */
export interface TagList {
  /**
   * current request status
   * @type {?string}
   */
  readyStatus?: string;

  /**
   * list of tags data
   * @type {?string[]}
   */
  data?: string[];

  /**
   * error from service call
   * @type {?Error}
   */
  error?: Error;
}
