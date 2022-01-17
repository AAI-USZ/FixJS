function (schema, callback) {
  //
  // Transforms a full JSON-schema into an array describing path and sub-schemas.
  // Used for iteration purposes.
  //
  function untangle(schema, path) {
    var results = [];
    path = path || [];

    if (schema.properties) {
      //
      // Iterate over the properties in the schema and use recursion
      // to process sub-properties.
      //
      Object.keys(schema.properties).forEach(function (key) {
        var obj = {};
        obj[key] = schema.properties[key];

        //
        // Concat a sub-untangling to the results.
        //
        results = results.concat(untangle(obj[key], path.concat(key)));
      });

      // Return the results.
      return results;
    }

    //
    // This is a schema "leaf".
    //
    return {
      path: path,
      schema: schema
    };
  }

  //
  // Iterate over the values in the schema, represented as
  // a legit single-property object sub-schemas.
  //
  function iterate(schema, get, done) {
    var iterator = [],
        result = {};

    if (typeof schema === 'string') {
      //
      // We can iterate over a single string.
      //
      iterator.push({
        path: [schema],
        schema: {}
      });
    }
    else if (Array.isArray(schema)) {
      //
      // An array of strings and/or single-prop schema and/or no-prop schema.
      //
      iterator = schema.map(function (element) {
        if (typeof element === 'string') {
          return {
            path: [element],
            schema: prompt.properties[element.toLowerCase()] || {}
          };
        }
        else if (element.properties) {
          return {
            path: [Object.keys(element.properties)[0]],
            schema: element.properties[Object.keys(element.properties)[0]]
          };
        }
        else if (element.path && element.schema) {
          return element;
        }
        else {
          return {
            path: [element.name || 'question'],
            schema: element
          };
        }
      });
    }
    else if (schema.properties) {
      //
      // Or a complete schema `untangle` it for use.
      //
      iterator = untangle(schema);
    }
    else {
      //
      // Or a partial schema and path.
      // TODO: Evaluate need for this option.
      //
      iterator = [{
        schema: schema.schema ? schema.schema : schema,
        path: schema.path || [schema.name || 'question']
      }];
    }

    //
    // Now, iterate and assemble the result.
    //
    async.forEachSeries(iterator, function (branch, next) {
      get(branch, function assembler(err, line) {
        if (err) {
          return next(err);
        }

        function build(path, line) {
          var obj = {};
          if (path.length) {
            obj[path[0]] = build(path.slice(1), line);
            return obj;
          }

          return line;
        }

        function attach(obj, attr) {
          var keys;
          if (typeof attr !== 'object') {
            return attr;
          }

          keys = Object.keys(attr);
          if (keys.length) {
            if (!obj[keys[0]]) {
              obj[keys[0]] = {};
            }
            obj[keys[0]] = attach(obj[keys[0]], attr[keys[0]]);
          }

          return obj;
        }

        result = attach(result, build(branch.path, line));
        next();
      });
    }, function (err) {
      return err ? done(err) : done(null, result);
    });
  }

  iterate(schema, function get(target, next) {
    prompt.getInput(target, function (err, line) {
      return err ? next(err) : next(null, line);
    });
  }, callback);

  return prompt;
}