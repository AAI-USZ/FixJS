function(store, type, record) {
    var id = get(record, 'id');
    var root = this.rootForType(type);

    var data = {};
    data[root] = record.toJSON();

    this.ajax(this.buildURL(root, id), "PUT", {
      data: data,
      context: this,
      success: function(json) {
        this.didUpdateRecord(store, type, record, json);
      }
    });
  }