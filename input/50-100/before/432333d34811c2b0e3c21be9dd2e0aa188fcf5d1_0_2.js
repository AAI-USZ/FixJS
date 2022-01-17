function (instance, schema) {
  var a;
  if (typeof instance !== 'object') {
    this.addError("not an object");
  } else {
    for (var property in schema.properties) {
      if (schema.properties.hasOwnProperty(property)) {
        this.validate(instance[property], schema.properties[property]);
      }
    }
  }
}