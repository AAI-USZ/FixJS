function () {
  var z, re, im;
  if (arguments.length === 1 && Array.isArray(arguments[0]) && arguments[0].length === 2) {
    z = arguments[0];
    re = arguments[0][0];
    im = arguments[0][1];
  }
  else if (arguments.length === 2) {
    re = arguments[0] * Math.cos(arguments[1]);
    im = arguments[0] * Math.sin(arguments[1]);
    z = [re, im];
  }

  return Object.create(prototypes.complex, {
    re: {
      value: re,
      enumerable: true
    },
    im: {
      value: im,
      enumerable: true
    },
    z: {
      value: z,
      enumerable: true
    }
  });
}