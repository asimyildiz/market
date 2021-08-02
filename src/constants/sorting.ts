import { GroupRadioModel } from "../models/components/group.radio";

/**
 * list of sort items with their key, value properties
 * these keys can be used directly as a sorting parameters for json-server
 * @type {GroupRadioModel[]}
 */
const sortingData: GroupRadioModel[] = [
  {
    key: "price_ASC",
    value: "Price low to high",
  },
  {
    key: "price_DESC",
    value: "Price high to low",
  },
  {
    key: "added_DESC",
    value: "New to old",
  },
  {
    key: "added_ASC",
    value: "Old to new",
  },
];

export default sortingData;
