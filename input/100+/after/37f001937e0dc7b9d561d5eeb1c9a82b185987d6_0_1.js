function applyPaths () {
  // determine if query is selecting or excluding fields

  var fields = this._fields
    , exclude
    , keys
    , ki

  if (fields) {
    keys = Object.keys(fields);
    ki = keys.length;

    while (ki--) {
      if ('+' == keys[ki][0]) continue;
      exclude = 0 === fields[keys[ki]];
      break;
    }
  }

  // if selecting, apply default schematype select:true fields
  // if excluding, apply schematype select:false fields

  var selected = []
    , excluded = []
    , seen = [];

  analyzeSchema(this.model.schema);

  switch (exclude) {
    case true:
      excluded.length && this.select('-' + excluded.join(' -'));
      break;
    case false:
      selected.length && this.select(selected.join(' '));
      break;
    case undefined:
      // user didn't specify fields, implies returning all fields.
      // only need to apply excluded fields
      excluded.length && this.select('-' + excluded.join(' -'));
      break;
  }

  return seen = excluded = selected = keys = fields = null;

  function analyzeSchema (schema, prefix) {
    prefix || (prefix = '');

    // avoid recursion
    if (~seen.indexOf(schema)) return;
    seen.push(schema);

    schema.eachPath(function (path, type) {
      if (prefix) path = prefix + '.' + path;

      // array of subdocs?
      if (type.schema) {
        analyzeSchema(type.schema, path);
      }

      analyzePath(path, type);
    });
  }

  function analyzePath (path, type) {
    if ('boolean' != typeof type.selected) return;

    if (fields && ('+' + path) in fields) {
      // forced inclusion
      delete fields['+' + path];

      // if there are other fields being included, add this one
      // if no other included fields, leave this out (implied inclusion)
      if (false === exclude && keys.length > 1) {
        fields[path] = 1;
      }

      return
    };

    ;(type.selected ? selected : excluded).push(path);
  }
}