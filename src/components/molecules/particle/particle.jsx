import React, { useCallback, useEffect, useState } from "react";
import mojs from "mo-js";

import classes from "./styles.module.scss";

const blobBase = 1.6;

function Particle({
  position: { dataLeft, dataTop },
  color,
  particleRef,
  bubbleCenter,
  size,
}) {
  let blob = blobBase;
  let blobShift = blobBase;

  const [delta, setDelta] = useState(null);
  const [deltaShift, setDeltaShift] = useState(null);

  const inEasing = useCallback((el) => mojs.easing.cubic.in(el), []);

  useEffect(() => {
    particleRef.current.x = parseInt(dataLeft, 10);
    particleRef.current.y = parseInt(dataTop, 10);
  }, [dataLeft, dataTop, particleRef]);

  useEffect(() => {
    const x = Math.abs(bubbleCenter.x - particleRef.current.x);
    const y = Math.abs(bubbleCenter.y - particleRef.current.y);
    const radius = Math.sqrt(x * x + y * y);
    const a = blob - (2 * radius) / size;
    const b = blobShift - (2 * radius) / size;
    setDelta(mojs.helpers.clamp(inEasing(a), 0.03, 1));
    setDeltaShift(mojs.h.clamp(inEasing(b), 0.03, 1));
  }, [blob, blobShift, bubbleCenter, inEasing, particleRef, size]);

  useEffect(() => {
    if (
      particleRef.current.prevDelta !== delta ||
      particleRef.current.prevDeltaShift !== deltaShift
    ) {
      requestAnimationFrame(() => {
        const translateZ = -150 * inEasing(1 - deltaShift);
        const transform = `scale(${delta}) translateZ(${translateZ}px)`;
        mojs.h.setPrefixedStyle(particleRef.current, "transform", transform);
        particleRef.current.prevDelta = delta;
        particleRef.current.prevDeltaShift = deltaShift;
      });
    }
  }, [delta, deltaShift, inEasing, particleRef]);

  // const draw = useCallback(() => {
  //   const x = Math.abs(bubbleCenter.x - particleRef.current.x);
  //   const y = Math.abs(bubbleCenter.y - particleRef.current.y);
  //   const radius = Math.sqrt(x * x + y * y);
  //   const a = blob - (2 * radius) / size;
  //   const b = blobShift - (2 * radius) / size;
  //   const delta = mojs.helpers.clamp(inEasing(a), 0.03, 1);
  //   const deltaShift = mojs.h.clamp(inEasing(b), 0.03, 1);
  //   const isDeltaChanged = particleRef.current.prevDelta !== delta;
  //   if (isDeltaChanged || particleRef.current.prevDeltaShift !== deltaShift) {
  //     const translateZ = -150 * inEasing(1 - deltaShift);
  //     const transform = `scale(${delta}) translateZ(${translateZ}px)`;
  //     mojs.h.setPrefixedStyle(particleRef.current, "transform", transform);
  //     particleRef.current.prevDelta = delta;
  //     particleRef.current.prevDeltaShift = deltaShift;
  //   }

  //   requestAnimationFrame(draw);
  // }, [
  //   blob,
  //   blobShift,
  //   bubbleCenter.x,
  //   bubbleCenter.y,
  //   inEasing,
  //   particleRef,
  //   size,
  // ]);

  return (
    <div
      ref={particleRef || null}
      className={classes["particle"]}
      style={{ left: `${dataLeft}px`, top: `${dataTop}px` }}
    >
      <div
        className={classes["particle__inner"]}
        style={{ background: `${color}` }}
      ></div>
    </div>
  );
}

export default Particle;
