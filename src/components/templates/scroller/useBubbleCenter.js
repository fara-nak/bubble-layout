import { useMemo } from "react";
import { useState, useEffect, useCallback } from "react";

function useBubbleCenter({ containerRef, particleRef, iscroll }) {
  
  const [bubbleCenter, setBubbleCenter] = useState({ x: null, y: null });
  const [size, setSize] = useState(0);

  const wWidth = useMemo(() => window.innerWidth, []);
  const wHeight = useMemo(() => window.innerHeight, []);
  const particleRadius = useMemo(
    () =>
      particleRef.current
        ? parseInt(getComputedStyle(particleRef.current).width, 10) / 2
        : 0,
    [particleRef]
  );
  const xOffset = useMemo(() => particleRadius + 25, [particleRadius]);
  const yOffset = useMemo(() => 1.4 * particleRadius, [particleRadius]);

  const calcDimensions = useCallback(() => {
    const styles = getComputedStyle(containerRef.current);
    const width = parseInt(styles.width, 10);
    const height = parseInt(styles.height, 10);

    setBubbleCenter({
      x: width / 2 - wWidth / 2,
      y: height / 2 - wHeight / 2,
    });
    const x = Math.sqrt(wHeight * wHeight);
    const y = Math.sqrt(wWidth * wWidth);
    setSize(1 * Math.min(x, y));
  }, [containerRef, wHeight, wWidth]);

  const setBubblePosition = useCallback(() => {
    if (iscroll) {
      console.log("⚛️", iscroll.x, iscroll.y);
      setBubbleCenter({
        x: -iscroll.x + wWidth / 2 + xOffset,
        y: -iscroll.y + wHeight / 2 + yOffset,
      });
    }
  }, [iscroll, wHeight, wWidth, xOffset, yOffset]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      calcDimensions();
      setBubblePosition();
    });
  }, [calcDimensions, setBubblePosition]);

  useEffect(() => {
    if (containerRef.current) {
      calcDimensions();
    }
  }, [calcDimensions, containerRef]);

  return { bubbleCenter, size };
}

export default useBubbleCenter;
