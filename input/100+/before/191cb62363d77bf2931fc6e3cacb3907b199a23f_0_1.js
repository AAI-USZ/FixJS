function convert(schema) {
  var newProps = Object.keys(validate.messages),
      newSchema = false,
      key;

  newProps = newProps.concat(['description', 'dependencies']);

  for (key in schema) {
    if (newProps.indexOf(key) > 0) {
      newSchema = true;
      break;
    }
  }

  if (!newSchema || schema.validator || schema.warning || typeof schema.empty !== 'undefined') {
    schema.description = schema.message;
    schema.message = schema.warning;
    schema.pattern = schema.validator;

    if (typeof schema.empty !== 'undefined') {
      schema.required = !(schema.empty);
    }

    delete schema.warning;
    delete schema.validator;
    delete schema.empty;
  }

  return schema;
}