function (instance, schema, options) {
  if (typeof schema.type === 'object' && (schema.type instanceof Array)) {
    this.validateUnionType(instance, schema, options);
  } else {
    this.validateSchema(instance, schema, options);
  }
  return this.errors.length === 0;
}