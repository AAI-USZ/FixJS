function (schema) {
  if (schema.constructor == String) schema = { type: schema };
  var typeChecker = this.typeFor(schema.type);
  return new typeChecker(schema, this);
}