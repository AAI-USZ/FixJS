function (instance, schema) {
  var a;
  var prop;
  // Don't validate undefined's
  if (instance === undefined) {
    return;
  }
  if (typeof instance !== 'object') {
    this.addError("not an object");
  } else {
    for (var property in schema.properties) {
      if (schema.properties.hasOwnProperty(property)) {
        if (helpers.isDefined(instance) && helpers.isDefined(instance[property])) {
          prop = instance[property];
        } else {
          prop = undefined;
        }
        this.validate(prop, schema.properties[property], {'propertyName': property});
      }
    }
  }
}