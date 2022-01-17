function (instance, schema, options) {
  var a, i;
  // Don't validate undefined's
  if (instance === undefined) {
    return;
  }
  if (!(instance instanceof Array)) {
    this.addError("not an array");
  } else {
    if (!options) {
      options = {skipAttributes: ['items', 'type']};
    } else {
      if (options.skipAttributes === undefined || options.skipAttributes === null) {
        options.skipAttributes = ['items', 'type'];
      }
    }
    this.validateProperty(instance, schema, options);
    options.skipAttributes = [];
    for (i = 0; i < instance.length; i++) {
      if (options && options.propertyName) {
        options.propertyName = options.propertyName.concat("[", i, "]");
      }
      this.validate(instance[i], schema.items, options);
    }
  }
}