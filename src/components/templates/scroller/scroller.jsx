import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import IScroll from "iscroll";
import mojs from "mo-js";

import random from "../../../utils/random";
import BlobCircleWrapper from "../../molecules/blob-circle-wrapper/blob-circle-wrapper";
import Particle from "../../molecules/particle/particle";

import styles from "./styles.module.scss";

const particleLength = 20;
const blobBase = 1.6;

const backgrounds = ["#FC2D79", "#FCB635", "#11CDC5", " #4A90E2", "#c1c1c1"];

function Scroller() {
  const particleRef = useRef([]);
  const particleContainerRef = useRef(null);
  const particuleRadiusRef = useRef(null);
  const iscrollRef = useRef(null);

  if (particleRef.current.length !== particleLength) {
    particleRef.current = Array(particleLength)
      .fill()
      .map((_, i) => particleRef.current[i] || createRef());
  }

  // const [elRefs, setElRefs] = useState([]);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  // const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    iscrollRef.current = new IScroll("#wrapper", {
      scroll: true,
      freeScroll: true,
      mouseWheel: true,
      probeType: 3,
    });
  });

  console.log("👽", particleRef);

  console.log("📜", iscrollRef.current);

  useEffect(() => {
    if (particleRef.current.length && particleRef.current[0].current !== null) {
      particuleRadiusRef.current =
        parseInt(getComputedStyle(particleRef.current[0].current).width, 10) /
        2;
      console.log("PARTICULE RADIUS 🧭", particuleRadiusRef.current);
    }
  }, []);

  useEffect(() => {
    if (particleContainerRef.current) {
      const { width, height } = getComputedStyle(particleContainerRef.current);
      setDimensions({ width, height });
    }
  }, []);

  console.log("DIMENSIONS", dimensions);

  return (
    <div id="wrapper" className={styles["wrapper"]}>
      <div ref={particleContainerRef} className={styles["particles"]}>
        <BlobCircleWrapper />
        {Array.from({ length: particleLength }).map((_, i) => (
          <Particle
            key={`particle-${i}`}
            particleRef={particleRef.current[i]}
            index={i}
            color={backgrounds[random(0, 4)]}
          />
        ))}
      </div>
    </div>
  );
}

export default Scroller;
