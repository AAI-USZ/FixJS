function Attribute(validator, name, schema, instance, propertyName) {
  this.validator = validator;
  this.name = name;
  this.schema = schema;
  this.value = schema[name];
  this.propertyName = propertyName;
  this.instance = instance;

  return this;
}