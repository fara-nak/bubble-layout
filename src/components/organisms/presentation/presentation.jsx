import React from "react";
import classes from "./styles.module.scss";

function Presentation({ ...rest }) {
  return (
    <section className={classes["container"]}>
      <div className={classes["me-container"]}>
        <h3 className={classes["hero"]}>
          <span role="img" aria-label="salut">
            👋
          </span>{" "}
          Hey ! Je suis Nicolas, bienvenue sur mon blog yo
        </h3>
      </div>
    </section>
  );
}

export default Presentation;
