function (instance, schema, options) {
  var a;
  var valid = null;
  if (!options) {
    options = {addError: true};
  } else {
    if (options.addError === undefined || options.addError === null) {
      options.addError = true;
    }
  }
  for (var key in schema) {
    if (schema.hasOwnProperty(key)) {
      a = new Attribute(this, key, schema, instance, options.propertyName);
      valid = a.validate();

      if (options.addError === true) {
        this.addError(valid);
      }
    }
  }
  return (valid === undefined);
}