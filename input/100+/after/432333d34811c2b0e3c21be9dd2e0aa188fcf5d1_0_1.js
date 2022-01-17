function (instance, schema, options) {
  var basicTypes = ['string', 'number', 'integer', 'boolean', 'null', 'date', 'any'];

  if (schema.type) {
    if (basicTypes.indexOf(schema.type) >= 0) {
      return this.validateProperty(instance, schema, options);
    }
    if (schema.type === 'object') {
      return this.validateObject(instance, schema, options);
    }
    if (schema.type === 'array') {
      return this.validateArray(instance, schema, options);
    }
  }
  if (schema.$ref) {
    return this.validateProperty(instance, schema, options);
  }
}