function(store, type, record, json) {
    var root = this.rootForType(type);

    this.sideload(store, type, json, root);
    store.didCreateRecord(record, json[root]);
  }