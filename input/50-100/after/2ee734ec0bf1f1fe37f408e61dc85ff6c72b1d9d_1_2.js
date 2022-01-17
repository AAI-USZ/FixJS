function () {
  var valid = true;

  if (helpers.isNumber(this.instance)) {
    if (this.schema.exclusiveMinimum && this.schema.exclusiveMinimum === true) {
      valid = this.instance > this.value;
    } else {
      valid = this.instance >= this.value;
    }
  }
  if (!valid) {
    return this.createError("is not " + this.value);
  }
}