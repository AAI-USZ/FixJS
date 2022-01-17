function () {
  var valid = true;
  if (this.value && this.validator.schemas[this.value]) {
    this.validator.validateSchema(this.instance, this.validator.schemas[this.value]);
  } else {
    return this.createError("no such schema" + this.value);
  }
}