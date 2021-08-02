import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { RouteConfig, renderRoutes } from "react-router-config";
import { loadableReady } from "@loadable/component";
import {
  ThemeProvider,
  StylesProvider,
  createTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import createStore from "../middleware/store";
import routes from "../routes";

// Get the initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const { store, history } = createStore({ initialState });
// create a new theme
const theme = createTheme({
  typography: {
    fontFamily: [
      "Open Sans",
      "Arial",
      "sans-serif",
      "Helvetica",
      "Helvetica-Light",
    ].join(","),
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.8125rem",
    },
    body3: {
      fontSize: "0.75rem",
    },
    input1: {
      fontSize: "0.9375rem",
    },
    input2: {
      fontSize: "0.875rem",
    },
    title1: {
      fontSize: "1.25rem",
    },
    title2: {
      fontSize: "0.8125rem",
    },
    sum: {
      fontSize: "1rem",
    },
  },
  palette: {
    primary: {
      main: "#1EA4CE",
    },
    secondary: {
      main: "#1EA4CE",
    },
  },
  overrides: {
    MuiInputLabel: {
      outlined: {
        "&$shrink": {
          transform: "translate(14px, -11px) scale(0.75)",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
      },
    },
  },
});
responsiveFontSizes(theme);

// @ts-expect-error
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

/**
 * render method of our app
 * ThemeProvider will apply current theme
 * StylesProvider "injectfirst" will add our css files after global css's
 * so that we can override them
 * Provider will connect our redux store
 * ConnectedRouter will connect our routes
 * @param {RouteConfig[]} Routes
 * @returns
 */
const render = (Routes: RouteConfig[]) =>
  renderMethod(
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {renderRoutes(Routes)}
          </ConnectedRouter>
        </Provider>
      </StylesProvider>
    </ThemeProvider>,
    document.getElementById("react-view")
  );

// loadable-component setup
loadableReady(() => render(routes as RouteConfig[]));

/**
 * A temporary workaround for Webpack v5 + HMR, why? see this issue: https://github.com/webpack-contrib/webpack-hot-middleware/issues/390
 */
// @ts-expect-error
if (module.hot) module.hot.accept();
