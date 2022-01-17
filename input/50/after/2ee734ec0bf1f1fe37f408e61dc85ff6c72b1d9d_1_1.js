function (message) {
  return helpers.createError(this.name, this.propertyName, message);
}