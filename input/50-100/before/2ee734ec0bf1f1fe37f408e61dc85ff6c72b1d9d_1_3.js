function () {
  var valid = true;

  if (helpers.isNumber(this.instance)) {
    if (this.schema.exclusiveMaximum && this.schema.exclusiveMaximum === true) {
      valid = this.instance < this.value;
    } else {
      valid = this.instance <= this.value;
    }
  }
  if (!valid) {
    return "maximum";
  }
}