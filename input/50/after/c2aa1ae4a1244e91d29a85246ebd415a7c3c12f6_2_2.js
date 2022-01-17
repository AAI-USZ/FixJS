function(data) {
    if (data === null) return null;
    var record = new Record({model: this, data: data});
    callback(record);
  }