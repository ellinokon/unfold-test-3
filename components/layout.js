import Head from "next/head";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <main className={styles.main}>
      <Head>
        <title>Unfold Test 3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </main>
  );
}
