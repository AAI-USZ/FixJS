function(array, f) {
  if (f == pv.index) return (array.length - 1) / 2;
  array = map(array, f).sort(pv.naturalOrder);
  if (array.length % 2) return array[Math.floor(array.length / 2)];
  var i = array.length / 2;
  return (array[i - 1] + array[i]) / 2;
}