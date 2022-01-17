function () {
  var valid = true;

  if (!helpers.isDefined(this.instance) && this.value === true) {
    return this.createError("is required");
  }
}