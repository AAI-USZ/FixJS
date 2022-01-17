function(store, type, record, json) {
    var root = this.rootForType(type);

    this.sideload(store, type, json, root);
    store.didUpdateRecord(record, json && json[root]);
  }