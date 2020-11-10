import React, { useRef, useEffect } from "react";
import locomotiveScroll from "locomotive-scroll";

import Scroller from "../../organisms/scroller/scroller";
import Presentation from "../../organisms/presentation/presentation";

function Main() {
  const scrollRef = useRef();

  useEffect(() => {
    const scroll = new locomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });
  }, []);

  return (
    <main>
      <div data-scroll-container style={{ padding: "0 0" }} ref={scrollRef}>
        <Presentation
          data-scroll
          data-scroll-speed="3"
          data-scroll-position="top"
        />
        <section
          style={{
            position: "relative",
            height: "100vh",
            padding: "1rem",
            background: " white",
          }}
          //   data-scroll-section
          data-scroll
          data-scroll-speed="2"
          data-scroll-position="top"
        >
          <Scroller />
        </section>
      </div>
    </main>
  );
}

export default Main;
