function () {
  var valid = true;
  if (helpers.isString(this.instance)) {
    valid = (this.instance.match(this.value) !== null);
  }
  if (!valid) {
    return "pattern";
  }
}