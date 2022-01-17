function(key, value) {
    var data = get(this, 'data'),
        store = get(this, 'store'),
        ids, id, association;

    if (typeof type === 'string') {
      type = getPath(this, type, false) || getPath(window, type);
    }

    key = options.key || get(this, 'namingConvention').keyToJSONKey(key);
    ids = findRecord(store, type, data, key);
    association = store.findMany(type, ids);
    set(association, 'parentRecord', this);

    return association;
  }