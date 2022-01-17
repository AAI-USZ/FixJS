function (type, opt) {
  var uri = type.uri;

  if (this.type_registry[ uri ])
    throw new Rx.Error("tried to register type for already-registered uri " + uri);

  this.type_registry[ uri ] = type;
}