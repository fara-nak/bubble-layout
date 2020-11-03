import React from "react";

import classes from "./styles.module.scss";

function Particle({ index, color, particleRef }) {
  const left = index * 175;

  return (
    <div
      ref={particleRef || null}
      dataleft={left}
      datatop={0}
      className={classes["particle"]}
      style={{ left: `${left}px`, top: "0px" }}
    >
      <div
        className={classes["particle__inner"]}
        style={{ background: `${color}` }}
      ></div>
    </div>
  );
}

export default Particle;
