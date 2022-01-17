function (x) {
  if (x === null) {
    return 'null';
  }
  if (x === undefined) {
    return 'undefined';
  }
  return x.type ? x.type : Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
}