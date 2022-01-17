function () {
  var valid = true;
  valid = (helpers.isString(this.instance) && helpers.isFormat(this.instance, this.value));
  if (!valid) {
    return this.createError("does not conform to format" + this.value);
  }
}