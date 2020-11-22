import * as React from "react";
import Link from "next/link";
import styles from "./list-item.module.css";
import Image from "./image";
import { FiMaximize2, FiX, FiMessageSquare } from "react-icons/fi";

function ShowItem({ author, commentCount, title }) {
  return (
    <>
      <div className={styles.showContainer}>
        <Link href="/">
          <a className={styles.close} title="Close full">
            <FiX />
          </a>
        </Link>

        <h1 className={styles.showTitle}>{title}</h1>

        <div className={styles.details}>
          <div>By {author}</div>
          <div>
            {commentCount} <FiMessageSquare />
          </div>
        </div>
      </div>
    </>
  );
}

function initialShowState(propsShow) {
  if (typeof propsShow === "boolean") {
    return propsShow;
  } else {
    return false;
  }
}

export default function ListItem(props) {
  const { body, id, shareName, src, title } = props;
  const show = initialShowState(props.show);

  return (
    <section className={styles.container}>
      {!show && (
        <div className={styles.shared}>
          <span className={styles.strong}>Shared</span> by {shareName}
        </div>
      )}

      <Image {...{ id, show, src }}>{show && <ShowItem {...props} />}</Image>

      {!show && (
        <>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>

          <Link href={`/items/${id}`}>
            <a className={styles.open} title="Show full">
              <FiMaximize2 />
            </a>
          </Link>
        </>
      )}
    </section>
  );
}
