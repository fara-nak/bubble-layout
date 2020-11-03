import React, { useCallback, useEffect } from "react";
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

  const inEasing = mojs.easing.cubic.in;

  const draw = useCallback(() => {
    const x = Math.abs(bubbleCenter.x - particleRef.current.x);

    const y = Math.abs(bubbleCenter.y - particleRef.current.y);
    const radius = Math.sqrt(x * x + y * y);
    const a = blob - (2 * radius) / size;
    const b = blobShift - (2 * radius) / size;
    const delta = mojs.helpers.clamp(inEasing(a), 0.03, 1);
    const deltaShift = mojs.h.clamp(inEasing(b), 0.03, 1);
    const isDeltaChanged = particleRef.current.prevDelta !== delta;

    if (isDeltaChanged || particleRef.current.prevDeltaShift !== deltaShift) {
      const translateZ = -150 * inEasing(1 - deltaShift);
      const transform = `scale(${delta}) translateZ(${translateZ}px)`;
      mojs.h.setPrefixedStyle(particleRef.current, "transform", transform);
      particleRef.current.prevDelta = delta;
      particleRef.current.prevDeltaShift = deltaShift;
    }

    requestAnimationFrame(draw);
  }, [
    blob,
    blobShift,
    bubbleCenter.x,
    bubbleCenter.y,
    inEasing,
    particleRef,
    size,
  ]);

  useEffect(() => {
    particleRef.current.x = parseInt(dataLeft, 10);
    particleRef.current.y = parseInt(dataTop, 10);
    if (bubbleCenter.x && bubbleCenter.y && size > 0) {
      draw();
    }
  }, [
    bubbleCenter.x,
    bubbleCenter.y,
    dataLeft,
    dataTop,
    draw,
    particleRef,
    size,
  ]);

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
