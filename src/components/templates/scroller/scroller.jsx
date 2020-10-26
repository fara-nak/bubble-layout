import React, { useEffect, useRef, useState } from "react";

import BlobCircleWrapper from "../../molecules/blob-circle-wrapper/blob-circle-wrapper";
import Particle from "../../molecules/particle/particle";

import styles from "./styles.module.scss";

const particleLength = 20;

function Scroller() {
  console.log("SCROLLER") 
  const particleRef = useRef(null);
  const particleContainerRef = useRef(null);

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    if (particleRef.current) {
      console.log("COMPUTED STYLE", getComputedStyle(particleRef.current));
      const particleRadius =
        parseInt(getComputedStyle(particleRef.current).width, 10) / 2;
      console.log("PARTICULE RADIUS", particleRadius);
      // const radPoint = mojs.helpers.getradialPoint;
    }
  }, [particleRef]);

  useEffect(() => {
    if (particleContainerRef.current) {
      const { width, height } = getComputedStyle(particleContainerRef.current);
      setDimensions({ width, height });
    }
  }, []);

  console.log("DIMENSIONS", dimensions);

  return (
    <div className={styles["wrapper"]}>
      <div ref={particleContainerRef} className={styles["particles"]}>
        <BlobCircleWrapper />

        {Array.from({ length: particleLength  }).map((_, i) => (
          <Particle key={`particle-${i}`} particleRef={i === 0 ? particleRef : null} />
        ))}
      </div>
    </div>
  );
}

export default Scroller;
