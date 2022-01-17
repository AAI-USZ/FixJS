function () {
  var valid = true;
  valid = (helpers.isString(this.instance) && helpers.isFormat(this.instance, this.value));
  if (!valid) {
    return "format";
  }
}