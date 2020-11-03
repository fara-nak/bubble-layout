function intersperse(arr, separator) {
  return arr.reduce((acc, currentElement, currentIndex) => {
    const isLast = currentIndex === arr.length - 1;
    return [
      ...acc,
      currentElement,
      ...(isLast
        ? []
        : [
            typeof separator === "function"
              ? separator(currentIndex)
              : separator,
          ]),
    ];
  }, []);
}

export default intersperse;
