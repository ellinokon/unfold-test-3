import "../styles/globals.css";
import MorphTransition from "nextjs-morph-page";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MorphTransition>
        <Component {...pageProps} />
      </MorphTransition>
    </>
  );
}

export default MyApp;
