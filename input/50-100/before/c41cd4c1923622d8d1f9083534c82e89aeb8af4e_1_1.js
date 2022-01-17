function(jsonO) {
  var method = builder.locator.methodForName(builder.selenium2, jsonO.type);
  var values = {};
  values[method] = jsonO.value;
  return new builder.locator.Locator(method, values);
}