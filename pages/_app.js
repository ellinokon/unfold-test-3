import "../styles/globals.css";
import MorphTransition from "nextjs-morph-page";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MorphTransition timeout={0} classNames="morph">
        <Component {...pageProps} />
      </MorphTransition>
    </>
  );
}

export default MyApp;
