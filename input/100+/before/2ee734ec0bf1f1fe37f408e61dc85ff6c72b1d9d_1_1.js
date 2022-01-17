function () {
  var valid = false;
  switch (this.value) {
  case 'string':
    valid = helpers.isString(this.instance);
    break;
  case 'number':
    valid = helpers.isNumber(this.instance);
    break;
  case 'integer':
    valid = helpers.isInteger(this.instance);
    break;
  case 'boolean':
    valid = helpers.isBoolean(this.instance);
    break;
  case 'null':
    valid = helpers.isNull(this.instance);
    break;
  case 'date':
    valid = helpers.isDate(this.instance);
    break;
  case 'any':
    valid = true;
    break;
  default:
    break;
  }
  // Ignore undefined instances
  if (helpers.isDefined(this.instance) && !valid) {
    return "type is not " + this.value;
  }
}