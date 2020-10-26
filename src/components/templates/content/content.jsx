import React from "react";

import Dust from "../../molecules/dust/dust";

import classes from "./styles.modules.scss";

function Content() {
  return (
    <div className={classes["content"]}>
      <Dust className={classes["dust--1"]} />
      <Dust className={classes["dust--2"]} />
      <Dust className={classes["dust--3"]} />
    </div>
  );
}

export default Content;
