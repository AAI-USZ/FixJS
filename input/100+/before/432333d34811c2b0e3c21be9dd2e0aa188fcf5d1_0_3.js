function (instance, schema) {
  var i;
  var valid = false;
  for (i = 0; i < schema.type.length; i++) {
    if (typeof schema.type[i] === 'string') {
      valid = this.validateSchema(instance, {'type': schema.type[i]}, {'addError': false});
    } else {
      valid = this.validateSchema(instance, schema.type[i], {'addError': false});
    }
    if (valid) {
      break;
    }
  }
  if (!valid) {
    this.addError("not any of " + schema.type.join(','));
  }
}