/* eslint-disable @typescript-eslint/no-unused-vars */
import createTypography from "@material-ui/core/styles/createTypography";

declare module "@material-ui/core/styles/createTypography" {
  interface Typography {
    body3: React.CSSProperties;
    input1: React.CSSProperties;
    input2: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    sum: React.CSSProperties;
  }

  // allow configuration using `createMuiTheme`
  interface TypographyOptions {
    body3?: React.CSSProperties;
    input1?: React.CSSProperties;
    input2?: React.CSSProperties;
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
    sum?: React.CSSProperties;
  }
}

declare module "@material-ui/core/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    input1: true;
    input2: true;
    title1: true;
    title2: true;
    sum: true;
  }
}
