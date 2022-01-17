function (x) {
  return x.type ? x.type : Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
}