function (prop, callback) {
  var schema = prop.schema || prop,
      propName = prop.path && prop.path.join(':') || prop,
      storedSchema = prompt.properties[propName.toLowerCase()],
      delim = prompt.delimiter,
      defaultLine,
      against,
      hidden,
      length,
      valid,
      name,
      raw,
      msg;

  //
  // Handle overrides here.
  // TODO: Make overrides nestable
  //
  if (prompt.override && prompt.override[propName]) {
    return callback(null, prompt.override[propName]);
  }
  
  //
  // If there is a stored schema for `propName` in `propmpt.properties`
  // then use it. 
  //
  if (schema instanceof Object && !Object.keys(schema).length &&
    typeof storedSchema !== 'undefined') {
    schema = storedSchema;
  }

  //
  // Build a proper validation schema if we just have a string
  // and no `storedSchema`.
  //
  if (typeof prop === 'string' && !storedSchema) {
    schema = {};
  }
  
  schema = convert(schema);
  defaultLine = schema.default;
  name = prop.description || schema.description || propName;
  raw = prompt.colors
    ? [prompt.message, delim + name.grey, delim.grey]
    : [prompt.message, delim + name, delim];

  prop = {
    schema: schema,
    path: propName.split(':')
  };

  //
  // If the schema has no `properties` value then set 
  // it to an object containing the current schema
  // for `propName`.
  //
  if (!schema.properties) {
    schema = (function () {
      var obj = { properties: {} };
      obj.properties[propName] = schema;
      return obj;
    })();
  }
  
  //
  // Calculate the raw length and colorize the prompt
  //
  length = raw.join('').length;
  raw[0] = raw[0];
  msg = raw.join('');

  if (schema.help) {
    schema.help.forEach(function (line) {
      logger.help(line);
    });
  }

  //
  // Emit a "prompting" event
  //
  prompt.emit('prompt', prop);

  //
  // Make the actual read
  //
  read({
    prompt: msg,
    silent: prop.schema && prop.schema.hidden,
    default: defaultLine || null,
    stdin: stdin,
    stdout: stdout
  }, function (err, line) {
    if (err) {
      return callback(err);
    }

    var against = {},
        valid;

    if (typeof line !== 'string') {
      line = '';
    }

    if (line && line !== '') {
      against[propName] = line;
    }

    // Validate.
    try { valid = validate(against, schema) }
    catch (err) { return callback(err) }

    if (!valid.valid) {
      if (prompt.colors) {
        logger.error('Invalid input for ' + name.grey);
      }
      else {
        logger.error('Invalid input for ' + name);
      }

      if (prop.schema.message) {
        logger.error(prop.schema.message);
      }

      prompt.emit('invalid', prop, line);
      return prompt.getInput(prop, callback);
    }

    //
    // Log the resulting line, append this `property:value`
    // pair to the history for `prompt` and respond to
    // the callback.
    //
    logger.input(line.yellow);
    prompt._remember(propName, line);
    callback(null, line);
  });
}