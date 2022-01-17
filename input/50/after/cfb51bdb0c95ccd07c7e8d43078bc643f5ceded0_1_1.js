function (schema, validator, propertyName, message) {
  var result = {
    'validator': validator,
    'property': propertyName,
    'message': message,
  };
  return result;
}