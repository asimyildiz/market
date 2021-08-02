import { Product } from "./product.interface";

/**
 * interface to represent a cart
 * @interface Cart
 */
export interface Cart {
  /**
   * this object will store current products
   * added to the card, with their counts
   * @type {[id: string]: {item: Product, count: number}}
   */
  [id: string]: {
    item: Product;
    count: number;
  };
}
