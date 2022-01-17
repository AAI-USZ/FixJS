function(value) {
  var value = ChoiceField.prototype.toJavaScript.call(this, value)
  ChoiceField.prototype.validate.call(this, value)
  if (value === this.emptyValue || isEmptyValue(value)) {
    return this.emptyValue
  }
  try {
    value = this.coerce(value)
  }
  catch (e) {
    throw ValidationError(
        format(this.errorMessages.invalidChoice, {value: value}))
  }
  return value
}