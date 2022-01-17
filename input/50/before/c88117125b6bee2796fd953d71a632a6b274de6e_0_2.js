function (typeName) {
  var uri = this.expand_uri(typeName);

  var typeChecker = this.type_registry[ uri ];
  if (! typeChecker) throw new Rx.Error('unknown type: ' + uri);

  return typeChecker;
}