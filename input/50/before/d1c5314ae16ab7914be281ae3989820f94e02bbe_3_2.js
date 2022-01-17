function(array, f) {
  if (f == pv.index) return 0;
  return Math.min.apply(null, f ? map(array, f) : array);
}