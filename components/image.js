import * as React from "react";
import styles from "./image.module.css";

export default function Image({ children, id, show, src }) {
  const containerClassName = show
    ? `${styles.imageContainer} ${styles.imageFull}`
    : `${styles.imageContainer} ${styles.imageMini}`;

  return (
    <div className={containerClassName}>
      <img className={styles.image} src={src} id={id} data-morph-ms="200" />
      {children}
    </div>
  );
}
