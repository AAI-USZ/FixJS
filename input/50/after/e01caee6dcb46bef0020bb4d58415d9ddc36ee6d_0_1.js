function (obj, type) {
  // if (MathLib.type(obj) === type) {
  //   return true;
  // }
  // return prototypes[type] ? prototypes[type].isPrototypeOf(obj) : typeof obj === type;

  do {
    if (MathLib.type(obj) === type) {
      return true;
    }
  }
  while (obj = Object.getPrototypeOf(Object(obj)));
  return false;
}