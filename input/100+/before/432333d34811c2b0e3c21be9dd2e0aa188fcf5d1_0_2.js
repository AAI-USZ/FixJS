function (instance, schema, options) {
  var a;
  var valid = null;
  if (!options) {
    options = {addError: true};
  }
  for (var key in schema) {
    if (schema.hasOwnProperty(key)) {
      a = new Attribute(this, key, schema, instance);
      valid = a.validate();

      if (options.addError === true) {
        this.addError(valid);
      }
    }
  }
  return (valid === undefined);
}