import "../styles/globals.css";
import { globalStyles } from "../styles/style";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
