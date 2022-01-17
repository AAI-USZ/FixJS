function(array, f) {
  if (f == pv.index) return 0;
  return Math.min.apply(null, f ? pv.map(array, f) : array);
}