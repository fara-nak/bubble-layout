import React, { createRef, useEffect, useLayoutEffect, useRef } from "react";
import IScroll from "iscroll";
import mojs from "mo-js";

import data from "../../../data.json";
import random from "../../../utils/random";
import BlobCircleWrapper from "../../molecules/blob-circle-wrapper/blob-circle-wrapper";
import Particle from "../../molecules/particle/particle";

import styles from "./styles.module.scss";
import useBubbleCenter from "./useBubbleCenter";

const particleLength = data.length;

const backgrounds = ["#FC2D79", "#FCB635", "#11CDC5", " #4A90E2", "#c1c1c1"];

function Scroller() {
  const particleRef = useRef([]);
  const particleContainerRef = useRef(null);
  const particuleRadiusRef = useRef(null);
  const iscrollRef = useRef(null);

  const { bubbleCenter, size } = useBubbleCenter(particleContainerRef);

  if (particleRef.current.length !== particleLength) {
    particleRef.current = Array(particleLength)
      .fill()
      .map((_, i) => particleRef.current[i] || createRef());
  }

  useLayoutEffect(() => {
    iscrollRef.current = new IScroll("#wrapper", {
      scroll: true,
      freeScroll: true,
      mouseWheel: true,
      probeType: 3,
    });
  });

  useEffect(() => {
    if (particleRef.current.length && particleRef.current[0].current !== null) {
      particuleRadiusRef.current =
        parseInt(getComputedStyle(particleRef.current[0].current).width, 10) /
        2;
    }
  }, []);

  useEffect(() => {
    const origin = `${bubbleCenter.x}px ${bubbleCenter.y}px`;
    const { h } = mojs;
    h.setPrefixedStyle(
      particleContainerRef.current,
      "perspective-origin",
      origin
    );
  }, [bubbleCenter]);

  return (
    <div id="wrapper" className={styles["wrapper"]}>
      <div ref={particleContainerRef} className={styles["particles"]}>
        <BlobCircleWrapper />
        {Array.from({ length: particleLength }).map((_, i) => (
          <Particle
            key={`particle-${i}`}
            particleRef={particleRef.current[i]}
            position={data[i]}
            color={backgrounds[random(0, 4)]}
            bubbleCenter={bubbleCenter}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

export default Scroller;
