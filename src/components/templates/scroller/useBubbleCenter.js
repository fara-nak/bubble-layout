import { useState, useEffect, useCallback, useMemo } from "react";
import IScroll from "iscroll";

function useBubbleCenter({ containerRef, particleRef, wrapperRef }) {
  console.log("render");
  const [bubbleCenter, setBubbleCenter] = useState({ x: null, y: null });
  const [size, setSize] = useState(0);


  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  const particleRadius = particleRef.current
    ? parseInt(getComputedStyle(particleRef.current).width, 10) / 2
    : 0;

  const xOffset = particleRadius + 25;
  const yOffset = 1.4 * particleRadius;
  const styles = containerRef.current
    ? getComputedStyle(containerRef.current)
    : {};
  const width = parseInt(styles.width, 10);
  const height = parseInt(styles.height, 10);
  const centerX = width / 2 - wWidth / 2;
  const centerY = height / 2 - wHeight / 2;
  const calcDimensions = useCallback(() => {
    setBubbleCenter({
      x: centerX,
      y: centerY,
    });
    const x = Math.sqrt(wHeight * wHeight);
    const y = Math.sqrt(wWidth * wWidth);
    setSize(1 * Math.min(x, y));
  }, [centerX, centerY, wHeight, wWidth]);



  const iscroll = useMemo(
    () =>
      wrapperRef.current
        ? new IScroll(wrapperRef.current, {
            scrollX: true,
            freeScroll: true,
            mouseWheel: true,
            probeType: 3,
          })
        : null,
    
  );

  console.log(wrapperRef)

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

  useEffect(() => {
    if (iscroll) {
      console.log("ISCROLL")
      console.log(iscroll)
      const x = -centerX + wWidth / 2 + xOffset;
      const y = -centerY + wHeight / 2 + yOffset;
      iscroll.scrollTo(x, y, 10);
    }
  }, [
    centerX,
    centerY,
    // containerRef,
    iscroll,
    wHeight,
    wWidth,
    xOffset,
    yOffset,
  ]);

  return { bubbleCenter, size };
}

export default useBubbleCenter;
