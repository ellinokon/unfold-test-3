import * as React from "react";
import styles from "./image.module.css";

export function useElementDimensions(ref) {
  const [dimensions, setDimensions] = React.useState(null);

  React.useEffect(() => {
    const current = ref.current;

    if (current) {
      function handleElementOffset() {
        window.requestAnimationFrame(() =>
          setDimensions({
            offsetTop: current.offsetTop,
            offsetLeft: current.offsetLeft,
            offsetWidth: current.offsetWidth,
            offsetHeight: current.offsetHeight,
            offsetParent: {
              offsetTop: current.offsetParent.offsetTop,
              offsetLeft: current.offsetParent.offsetLeft,
              offsetWidth: current.offsetParent.offsetWidth,
              offsetHeight: current.offsetParent.offsetHeight,
            },
          })
        );
      }

      handleElementOffset();
      window.addEventListener("scroll", handleElementOffset);
      window.addEventListener("resize", handleElementOffset);
      return () => {
        window.removeEventListener("scroll", handleElementOffset);
        window.removeEventListener("resize", handleElementOffset);
      };
    }

    return;
  }, [ref.current]);

  return dimensions;
}

function useContainerStyles(miniRef, show) {
  const miniDimensions = useElementDimensions(miniRef);
  const [containerStyles, setContainerStyles] = React.useState({});

  React.useEffect(() => {
    if (miniDimensions === null) {
      return;
    }

    if (show) {
      setContainerStyles({
        width: miniDimensions.offsetParent.offsetWidth,
        height: miniDimensions.offsetParent.offsetHeight,
        top: 0,
        left: 0,
      });
    } else {
      setContainerStyles({
        width: miniDimensions.offsetWidth,
        height: miniDimensions.offsetHeight,
        top: miniDimensions.offsetTop,
        left: miniDimensions.offsetLeft,
        borderRadius: "10px",
      });
    }
  }, [miniDimensions, show]);

  return containerStyles;
}

function useTransitionEndEffect(ref, setIsAnimating) {
  React.useEffect(() => {
    const current = ref.current;

    if (current) {
      function transitionEnd() {
        setIsAnimating(false);
      }

      current.addEventListener("transitionend", transitionEnd);

      return () => {
        current.removeEventListener("transitionend", transitionEnd);
      };
    }
  }, [ref.current, setIsAnimating]);
}

export default function Image({ children, setIsAnimating, show, src }) {
  const miniRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const containerStyles = useContainerStyles(miniRef, show)

  useTransitionEndEffect(containerRef, setIsAnimating);

  return (
    <div className={styles.containerMini} ref={miniRef}>
      <div
        className={styles.imageContainer}
        style={containerStyles}
        ref={containerRef}
      >
        <img className={styles.image} src={src} />
        {children}
      </div>
    </div>
  );
}
