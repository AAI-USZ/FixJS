function () {
  var valid = true;
  if (this.value && this.validator.schemas[this.value]) {
    this.validator.validateSchema(this.instance, this.validator.schemas[this.value]);
  } else {
    return "no such schema: " + this.value;
  }
}