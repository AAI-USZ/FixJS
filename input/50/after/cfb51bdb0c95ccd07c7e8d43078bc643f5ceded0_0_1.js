function (message) {
  return helpers.createError(this.schema, this.name, this.propertyName, message);
}