import React from "react";
// import mojs from "mo-js";

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
}) {
  const round = Math.floor(index / lineLength);
  const x = (index % lineLength) * w + (round % 2) * margin;
  const y = round * h;
  return (
    <div
      ref={particleRef || null}
      className={classes["particle"]}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <div
        className={classes["particle__inner"]}
        style={{ background: `${color}` }}
      >
        COUCOU
      </div>
    </div>
  );
}

export default Particle;
