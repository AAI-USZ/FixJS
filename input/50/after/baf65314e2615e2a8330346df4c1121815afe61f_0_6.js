function () {
  var result = this.toArray();

  if (result.length === 0) {
    return false;
  } else if (this.onlyFlag) {
    return result.shift();
  } else {
    return result;
  }
}