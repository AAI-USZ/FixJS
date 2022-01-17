function(array, f) {
  var norm = map(array, f), sum = pv.sum(norm);
  for (var i = 0; i < norm.length; i++) norm[i] /= sum;
  return norm;
}