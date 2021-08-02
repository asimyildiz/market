import { History } from "history";
import { connectRouter } from "connected-react-router";

import cart from "./cart";
import productList from "./product.list";
import companyList from "./company.list";
import tagList from "./tag.list";
import itemtypeList from "./itemtype.list";

// Use inferred return type for making correctly Redux types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (history: History) => ({
  cart,
  productList,
  companyList,
  tagList,
  itemtypeList,
  router: connectRouter(history) as any,
  // Register more reducers...
});
