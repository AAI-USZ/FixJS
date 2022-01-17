function (schema) {
  if (schema.constructor == String) schema = { type: schema };
  var typeChecker = this.typeFor(schema.type);

  if (typeof(typeChecker) == 'object') {
    if (! Rx.Util._x_subset_keys_y(schema, { type: true }))
      throw new Rx.Error('composed type does not take check arguments');
    return this.makeSchema(typeChecker.schema);
  } else {
    return new typeChecker(schema, this);
  }
}