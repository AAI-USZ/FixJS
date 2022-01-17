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
      if ('_id' == keys[ki]) continue;
      exclude = 0 === fields[keys[ki]];
      break;
    }
  }

  // if selecting, apply default schematype select:true fields
  // if excluding, apply schematype select:false fields
  // if not specified, apply both

  var selected = []
    , excluded = []

  this.model.schema.eachPath(function (path, type) {
    if ('boolean' != typeof type.selected) return;
    ;(type.selected ? selected : excluded).push(path);
  });

  switch (exclude) {
    case true:
      excluded.length && this.select('-' + excluded.join(' -'));
      break;
    case false:
      selected.length && this.select(selected.join(' '));
      break;
    case undefined:
      excluded.length && this.select('-' + excluded.join(' -'));
      selected.length && this.select(selected.join(' '));
      break;
  }
}