import "../styles/globals.css";
import type { AppProps } from "next/app";
import wrapper from "../store";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

function _App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(_App);
