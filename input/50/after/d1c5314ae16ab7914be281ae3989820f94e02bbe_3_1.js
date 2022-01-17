function(array, f) {
  if (f == pv.index) return array.length - 1;
  return Math.max.apply(null, f ? pv.map(array, f) : array);
}