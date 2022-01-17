function Attribute(validator, name, schema, instance) {
  this.validator = validator;
  this.name = name;
  this.schema = schema;
  this.value = schema[name];
  this.instance = instance;

  return this;
}