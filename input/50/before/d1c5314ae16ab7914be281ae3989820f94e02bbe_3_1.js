function(array, f) {
  if (f == pv.index) return array.length - 1;
  return Math.max.apply(null, f ? map(array, f) : array);
}