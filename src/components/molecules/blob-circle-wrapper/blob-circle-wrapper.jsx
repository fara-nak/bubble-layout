import React from "react";

import BlobCircleEllipse from "../../atoms/blob-circle-ellipse/blob-circle-ellipse";

import styles from "./styles.module.scss";

function BlobCircleWrapper() {
  return (
    <div className={styles["blob-circle-warp"]}>
      <div className={(styles["bob-circle"], styles["sprite"])}>
        {Array.from({ length: 10 }).map((_, i) => (
          <BlobCircleEllipse key={`blob-circle-wrapper-${i}`} />
        ))}
      </div>
    </div>
  );
}

export default BlobCircleWrapper;
