function compile (name, schema, collectionName, connection, base) {
  // generate new class
  function model (doc, fields, skipId) {
    if (!(this instanceof model))
      return new model(doc, fields, skipId);
    Model.call(this, doc, fields, skipId);
  };

  model.modelName = name;
  model.__proto__ = Model;
  model.prototype.__proto__ = Model.prototype;
  model.prototype.db = connection;
  model.prototype._setSchema(schema);
  model.prototype.collection = connection.collection(
      collectionName
    , schema.options.capped
  );

  // apply methods
  for (var i in schema.methods)
    model.prototype[i] = schema.methods[i];

  // apply statics
  for (var i in schema.statics)
    model[i] = schema.statics[i];

  // apply named scopes
  if (schema.namedScopes) schema.namedScopes.compile(model);

  model.model = model.prototype.model;
  model.options = model.prototype.options;
  model.db = model.prototype.db;
  model.schema = model.prototype.schema;
  model.collection = model.prototype.collection;
  model.base = base;

  return model;
}