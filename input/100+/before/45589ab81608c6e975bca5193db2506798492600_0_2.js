function(json, data, meta, options) {
    var key = meta.key, value, id;

    if (options.embedded) {
      key = options.key || get(this, 'namingConvention').keyToJSONKey(key);
      value = get(data.record, key);
      json[key] = value ? value.toJSON(options) : null;
    } else {
      key = options.key || get(this, 'namingConvention').foreignKey(key);
      id = data.get(key);
      json[key] = none(id) ? null : id;
    }
  }