import React, { useCallback, useEffect, useRef, useState } from "react";
import IScroll from "iscroll";
import mojs from "mo-js";

import random from "../../../utils/random";
import BlobCircleWrapper from "../../molecules/blob-circle-wrapper/blob-circle-wrapper";
import Particle from "../../molecules/particle/particle";

import styles from "./styles.module.scss";
import useDimensions from "../../../hooks/useDimensions";
import { useLayoutEffect } from "react";

const particleLength = 600;

const backgrounds = ["#FC2D79", "#FCB635", "#11CDC5", " #4A90E2", "#c1c1c1"];

function Scroller() {
  const bubbleCenter = useRef({});
  const size = useRef();

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

  const setBubblePosition = useCallback(() => {
    const x = iscroll.x + wWidth / 2 + xOffset;
    const y = iscroll.y + wHeight / 2 + yOffset;
    bubbleCenter.current = { x, y };
  });

  useEffect(() => {
    if (dimensions && iscroll) {
      const { width, height } = dimensions;
      const centerY = height / 2 - wHeight / 2;
      const centerX = width / 2 - wWidth / 2;
      const x = -centerX + wWidth / 2 + xOffset;
      const y = -centerY + wHeight / 2 + yOffset;
      iscroll.current = new IScroll("#wrapper", {
        scrollX: true,
        freeScroll: true,
        mouseWheel: true,
        probType: 3,
      });
      iscroll.current.scrollTo(x, y, 10);
      bubbleCenter.current = { x: centerX, y: centerY };
      size.current =
        1 * Math.min(Math.sqrt(wHeight * wHeight), Math.sqrt(wWidth * wWidth));

      console.log(getComputedStyle(document.querySelector("#wrapper")).height);
    }
  }, [
    dimensions,
    iscroll,
    setBubblePosition,
    wHeight,
    wWidth,
    xOffset,
    yOffset,
  ]);

  return (
    <div id="wrapper" onWheel={setBubblePosition} className={styles["wrapper"]}>
      <div ref={containerRef} className={styles["particles"]}>
        <BlobCircleWrapper />
        {Array.from({ length: particleLength }).map((_, i) => (
          <Particle
            index={i}
            key={`particle-${i}`}
            particleRef={particleRef.current[i]}
            color={backgrounds[random(0, 4)]}
          />
        ))}
      </div>
    </div>
  );
}

export default Scroller;
