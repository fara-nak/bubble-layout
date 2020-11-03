import { useState, useEffect } from "react";

function useBubbleCenter(ref) {
  const [bubbleCenter, setBubbleCenter] = useState({ x: null, y: null });
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const styles = getComputedStyle(ref.current);
      const width = parseInt(styles.width, 10);
      const height = parseInt(styles.height, 10);
      const wWidth = window.innerWidth;

      const wHeight = window.innerHeight;
      console.log(width, wWidth, height, wHeight);
      setBubbleCenter({
        x: width / 2 - wWidth / 2,
        y: height / 2 - wHeight / 2,
      });

      const x = Math.sqrt(wHeight * wHeight);
      const y = Math.sqrt(wWidth * wWidth);
      setSize(1 * Math.min(x, y));
    }
  }, [ref]);

  return { bubbleCenter, size };
}

export default useBubbleCenter;
