function () {
  var result = [];

  for (var i = 0; i < this.values.length; i += 1) {
    result.push(('00000000' + (this.values[i] >>> 0).toString(16)).slice(-8));
  }
  return result.join('');
}