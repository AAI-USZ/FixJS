function (schema) {
  if (schema.constructor == String) schema = { type: schema };
  var typeChecker = this.typeFor(schema.type);

  if (typeof(typeChecker) == 'object') {
    return this.makeSchema(typeChecker.schema);
  } else {
    return new typeChecker(schema, this);
  }
}