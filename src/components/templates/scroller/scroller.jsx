import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import IScroll from "iscroll";

import BlobCircleWrapper from "../../molecules/blob-circle-wrapper/blob-circle-wrapper";
import Particle from "../../molecules/particle/particle";
import styles from "./styles.module.scss";
import useDimensions from "../../../hooks/useDimensions";
import random from "../../../utils/random";
import { useLayoutEffect } from "react";

const particleLength = 600;

const backgrounds = ["#FC2D79", "#FCB635", "#11CDC5", " #4A90E2", "#c1c1c1"];

function Scroller() {
  const [bubleCenter, setBubleCenter] = useState({});
  const [size, setSize] = useState(null);

  const shuffle = useMemo(
    () =>
      Array.from(
        { length: particleLength },
        () => backgrounds[random(0, backgrounds.length)]
      ),
    []
  );

  const iscroll = useRef(null);

  const getRadius = useCallback(
    (ref) => parseInt(getComputedStyle(ref.current[0].current).width, 10) / 2,
    []
  );

  const [particleRef, particleRadius] = useDimensions(
    particleLength,
    getRadius
  );

  const getWidthAndHeight = useCallback((ref) => {
    const { width, height } = getComputedStyle(ref.current);
    return { width: parseInt(width, 10), height: parseInt(height, 10) };
  }, []);

  const [containerRef, dimensions] = useDimensions(false, getWidthAndHeight);

  // const radPoint = useCallback((el) => mojs.helpers.getRadialPoint(el), []);

  const xOffset = particleRadius && particleRadius + 25;
  const yOffset = 1.4 * particleRadius;
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  const { width, height } = dimensions;
  const centerY = height / 2 - wHeight / 2;
  const centerX = width / 2 - wWidth / 2;
  const x = -centerX + wWidth / 2 + xOffset;
  const y = -centerY + wHeight / 2 + yOffset;

  const setBubblePosition = useCallback(() => {
    const x = -iscroll.current.x + wWidth / 2 + xOffset;
    const y = -iscroll.current.y + wHeight / 2 + yOffset;

    setBubleCenter({ x, y });
  }, [wHeight, wWidth, xOffset, yOffset]);

  useLayoutEffect(() => {
    iscroll.current = new IScroll("#wrapper", {
      scrollX: true,
      freeScroll: true,
      mouseWheel: true,
      probType: 3,
    });
    iscroll.current.scrollTo(x, y, 10);
  }, [x, y]);

  useEffect(() => {
    if (dimensions) {
      setBubleCenter({ x: centerX, y: centerY });
      setSize(
        1 * Math.min(Math.sqrt(wHeight * wHeight), Math.sqrt(wWidth * wWidth))
      );
    }
  }, [centerX, centerY, dimensions, wHeight, wWidth]);

  useEffect(() => {
    window.addEventListener("resize", setBubblePosition);
    return () => window.removeEventListener("resize", setBubblePosition);
  });

  return (
    <div id="wrapper" onWheel={setBubblePosition} className={styles["wrapper"]}>
      <div
        ref={containerRef}
        className={styles["particles"]}
        style={{
          perspectiveOrigin: `${bubleCenter.x}px ${bubleCenter.y}px`,
        }}
      >
        <BlobCircleWrapper />
        {Array.from({ length: particleLength }).map((_, i) => (
          <Particle
            index={i}
            key={`particle-${i}`}
            particleRef={particleRef.current[i]}
            color={shuffle[i]}
            bubbleCenter={bubleCenter}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

export default Scroller;
