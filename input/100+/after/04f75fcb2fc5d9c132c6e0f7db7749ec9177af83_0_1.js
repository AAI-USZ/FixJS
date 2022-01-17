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
      exclude = 0 === fields[keys[ki]];
      break;
    }
  }

  // if selecting, apply default schematype select:true fields
  // if excluding, apply schematype select:false fields
  // if not specified, apply both

  var selected = []
    , excluded = []
    , seen = []

  analyzeSchema(this.model.schema);

  switch (exclude) {
    case true:
      this.exclude(excluded);
      break;
    case false:
      this.select(selected);
      break;
    case undefined:
      excluded.length && this.exclude(excluded);
      selected.length && this.select(selected);
      break;
  }

  return selected = excluded = seen = null;

  function analyzeSchema (schema, prefix) {
    prefix || (prefix = '');

    if (~seen.indexOf(schema)) return;
    seen.push(schema);

    schema.eachPath(function (path, type) {
      if (prefix) path = prefix + '.' + path;

      if (type.schema) {
        analyzeSchema(type.schema, path);
      }

      if ('boolean' != typeof type.selected) return;
      ;(type.selected ? selected : excluded).push(path);
    });
  }
}