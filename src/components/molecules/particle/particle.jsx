import React, { useMemo } from "react";
import clamp from "../../../utils/clamp";
import cubic from "../../../utils/cubicIn";

import classes from "./styles.module.scss";

const blobBase = 1.6;
const lineLength = 24;
const margin = 87.5;
const h = 137.5;
const w = 175;

function Particle({
  color,
  particleRef,
  index,
  bubbleCenter,
  size,
  blobShift = blobBase,
  children
}) {
  const round = useMemo(() => Math.floor(index / lineLength), [index]);
  const initX = useMemo(() => (index % lineLength) * w + (round % 2) * margin, [
    index,
    round,
  ]);
  const initY = useMemo(() => round * h, [round]);

  const deltas = useMemo(() => {
    const x = Math.abs(bubbleCenter.x - initX);
    const y = Math.abs(bubbleCenter.y - initY);
    const radius = Math.sqrt(x * x + y * y);
    const a = blobBase - (2 * radius) / size;
    const b = blobShift - (2 * radius) / size;
    const delta = clamp(cubic.in(a), 0.03, 1);
    const deltaShift = clamp(cubic.in(b), 0.03, 1);
    return { delta, deltaShift };
  }, [blobShift, bubbleCenter.x, bubbleCenter.y, initX, initY, size]);

  if (index === 2) console.log(deltas);

  return (
    <div
      ref={particleRef || null}
      className={classes["particle"]}
      style={{
        left: `${initX}px`,
        top: `${initY}px`,
        transform: `scale(${deltas.delta}) translateZ(${
          -150 * cubic.in(1 - deltas.deltaShift)
        }px)`,
      }}
    >
      <div
        className={classes["particle__inner"]}
        style={{ background: `${color}` }}
      >
        {children}
      </div>
    </div>
  );
}

export default Particle;
