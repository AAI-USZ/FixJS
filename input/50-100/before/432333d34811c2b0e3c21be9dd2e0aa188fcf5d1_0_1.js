function (instance, schema) {
  if (typeof schema.type === 'object' && (schema.type instanceof Array)) {
    this.validateUnionType(instance, schema);
  } else {
    this.validateSchema(instance, schema);
  }
  return this.errors.length === 0;
}