import { Company } from "../../middleware/interfaces/company.interface";
import { order } from "../../utils/helpers";

/**
 * interface to represent group checkbox model
 * @interface GroupCheckboxModel
 */
export interface GroupCheckboxModel {
  /**
   * key to use while selecting an element
   * @type {string}
   */
  key: string;

  /**
   * value to use while displaying an element
   * @type {string}
   */
  value: string;

  /**
   * data itself
   * @type {any}
   */
  item: any;
}

/**
 * creates a group checkbox model item from Company data
 * @param {Company[]} companies
 * @returns {GroupCheckboxModel[]}
 */
export const fromCompany = (
  companies?: Company[]
): GroupCheckboxModel[] | undefined =>
  companies?.map((company: Company) => ({
    key: company.slug,
    value: company.name,
    item: company,
  }));

/**
 * creates a group checkbox model item from Product data
 * @param {string[]} tags
 * @returns {GroupCheckboxModel[] | undefined}
 */
export const fromTags = (tags?: string[]): GroupCheckboxModel[] | undefined => {
  const orderedTags = order(tags);
  return Object.keys(orderedTags).map((key: string) => ({
    key,
    value: `${key.toLowerCase()} (${orderedTags[key]})`,
    item: orderedTags[key],
  }));
};
