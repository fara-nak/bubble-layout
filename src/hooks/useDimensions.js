const { useRef, createRef, useState, useLayoutEffect } = require("react");

function useDimensions(multi = false, measureFunc) {
  const ref = useRef(multi ? [] : null);
  const [dimensions, setDimensions] = useState({});

  if (multi && ref.current.length !== multi) {
    ref.current = Array(multi)
      .fill()
      .map((_, i) => ref.current[i] || createRef());
  }

  useLayoutEffect(() => {
    setDimensions(measureFunc(ref));
  }, [measureFunc, multi]);

  return [ref, dimensions];
}

export default useDimensions;
