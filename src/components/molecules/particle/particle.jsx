import React from "react";
import classes from "./styles.module.scss";

function Particle({ dataLeft, dataTop, bckgrnd, particleRef }) {
  console.log(particleRef);
  return (
    <div
      ref={particleRef || null}
      dataleft={dataLeft}
      datatop={dataTop}
      className={classes["particle"]}
    >
      <div
        className={classes["particle__inner"]}
        style={{ background: `${bckgrnd}` }}
      ></div>
    </div>
  );
}

export default Particle;
