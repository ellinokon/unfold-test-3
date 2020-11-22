import * as React from "react";
import { useRouter } from "next/router";
import styles from "./list-item.module.css";
import Image from "./image";
import { FiMaximize2, FiX, FiMessageSquare } from "react-icons/fi";
import next from "next";

function ShowItem({ author, commentCount, handleClose, title }) {
  return (
    <>
      <div className={styles.showContainer}>
        <a
          href="/"
          className={styles.close}
          title="Close full"
          onClick={handleClose}
        >
          <FiX />
        </a>

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
  const [show, setShow] = React.useState(initialShowState(props.show));
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [nextRoute, setNextRoute] = React.useState(null);
  // const router = useRouter();

  React.useEffect(() => {
    if (isAnimating === false && nextRoute !== null) {
      // router.push(nextRoute);
      setNextRoute(null);
    }
  }, [isAnimating, nextRoute]);

  function handleShow(e) {
    e.preventDefault();
    setShow(true);
    setIsAnimating(true);
    setNextRoute(`/items/${id}`);
  }

  function handleClose(e) {
    e.preventDefault();
    setShow(false);
    setIsAnimating(true);
    setNextRoute("/");
  }

  return (
    <section className={styles.container}>
      {!show && (
        <div className={styles.shared}>
          <span className={styles.strong}>Shared</span> by {shareName}
        </div>
      )}

      <Image {...{ setIsAnimating, show, src }}>
        {show && <ShowItem {...{ handleClose }} {...props} />}
      </Image>

      {!show && (
        <>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>

          <a
            href={`/items/${id}`}
            className={styles.open}
            title="Show full"
            onClick={handleShow}
          >
            <FiMaximize2 />
          </a>
        </>
      )}
    </section>
  );
}
