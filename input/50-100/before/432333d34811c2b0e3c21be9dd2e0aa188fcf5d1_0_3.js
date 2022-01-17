function (instance, schema) {
  var a, i;
  if (!(instance instanceof Array)) {
    this.addError("not an array");
  } else {
    for (i = 0; i < instance.length; i++) {
      this.validate(instance[i], schema.items);
    }
  }
}