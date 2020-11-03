import React from "react";
import c from "classnames";
import mojs from "mo-js";

import BlobCircleEllipse from "../../atoms/blob-circle-ellipse/blob-circle-ellipse";
import styles from "./styles.module.scss";
import { useRef } from "react";

function Dust({ classes }) {
  const dustRef = useRef();

    

  return (
    <div className={c(styles["dust"], classes)}>
      {Array.from({ length: 20 }).map(() => (
        <BlobCircleEllipse />
      ))}
    </div>
  );
}
export default Dust;
