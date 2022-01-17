function (uri, schema) {
  if (this.type_registry[ uri ])
    throw new Rx.Error("tried to learn type for already-registered uri " + uri);

  // make sure schema is valid
  // should this be in a try/catch?
  this.makeSchema(schema);

  this.type_registry[ uri ] = { schema: schema };
}