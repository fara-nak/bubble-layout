import React from "react";
import c from "classnames";

import BlobCircleEllipse from "../../atoms/blob-circle-ellipse/blob-circle-ellipse";
import styles from "./styles.module.scss";

function Dust({ classes }) {
  return (
    <div className={c(styles["dust"], classes)}>
      {Array.from({ length: 20 }).map(() => (
        <BlobCircleEllipse />
      ))}
    </div>
  );
}
export default Dust;
