const cubic = {
  in: function (k) {
    return k * k * k;
  },
  out: function (k) {
    return --k * k * k + 1;
  },
  inout: function (k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
  },
};

export default cubic;
