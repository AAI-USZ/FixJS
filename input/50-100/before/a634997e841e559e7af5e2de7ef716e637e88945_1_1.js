function $toNumber(a) {
  var result = parseFloat(a);

  if (isNaN(result) || !isFinite(result)) {
    result = 0;
  }

  return result;
}