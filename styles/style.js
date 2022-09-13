import { css, Global } from "@emotion/react";

export const globalStyles = (
  <Global
    styles={css`
      body,
      html {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        overflow: hidden;
        scrollbar-width: none;
        color: #000;
      }
    `}
  />
);
