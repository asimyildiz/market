import { RouteConfig } from "react-router-config";

import App from "../app";
import AsyncHome, { loadData as loadHomeData } from "../pages/Home";
import NotFound from "../pages/NotFound";

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: AsyncHome, // home page
        loadData: loadHomeData, // pre-load methods to run on server
      },
      {
        component: NotFound,
      },
    ],
  },
] as RouteConfig[];
