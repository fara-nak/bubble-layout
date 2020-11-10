import React from "react";

import "./App.css";
import Main from "./components/templates/main/main";

function App() {
  return (
    <>
      <header style={{ height: "4rem", background: "white", width: "100%" }}>
        Nterol
        <nav> ah que coucou</nav>
      </header>
      <Main />
      {/* <footer
        style={{
          height: "4rem",
          width: "100%",
          background: "white",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        Footer
      </footer> */}
    </>
  );
}

export default App;
