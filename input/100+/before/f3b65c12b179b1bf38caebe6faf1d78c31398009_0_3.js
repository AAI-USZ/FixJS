function (prop, callback) {
  var schema = prop.schema || prop,
      propName = prop.path && prop.path.join(':') || prop,
      storedSchema = prompt.properties[propName.toLowerCase()],
      delim = prompt.delimiter,
      defaultLine,
      against,
      length,
      valid,
      name,
      raw,
      msg;

  if (schema instanceof Object && !Object.keys(schema).length &&
    typeof storedSchema !== 'undefined') {
    schema = storedSchema;
  }

  schema = convert(schema);

  name = prop.description || schema.description || propName;
  raw = prompt.colors
    ? [prompt.message, delim + name.grey, delim.grey]
    : [prompt.message, delim + name, delim];

  defaultLine = schema.default;
  prop = {
    schema: schema,
    path: propName.split(':')
  };

  //
  // Handle overrides here.
  // TODO: Make overrides nestable
  //
  if (prompt.override && prompt.override[propName]) {
    return callback(null, prompt.override[propName]);
  }

  //
  // Build a proper validation schema if we just have a string
  //
  if (typeof prop === 'string') {
    schema = {};
  }

  //
  // TODO: Isn't this broken? Maybe?
  //
  if (!schema.properties) {
    schema = (function () {
      var obj = { properties: {} };
      obj.properties[propName] = schema;
      return obj;
    })();
  }

  // Show the default in the prompt (this is correct)
  if (defaultLine) {
    raw.splice(2, -1, ' (' + defaultLine + ')');
  }

  // Calculate the raw length and colorize the prompt
  length = raw.join('').length;
  raw[0] = raw[0];
  msg = raw.join('');

  if (schema.help) {
    schema.help.forEach(function (line) {
      logger.help(line);
    });
  }

  //
  // Write the message, emit a "prompting" event
  // TODO: Find prompt.on's
  //
  prompt.emit('prompt', schema);

  //
  // Make the actual read
  //
  read({
    prompt: msg,
    silent: schema.hidden,
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