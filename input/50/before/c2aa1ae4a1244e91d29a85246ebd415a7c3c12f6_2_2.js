function(data) {
    if (data === null) return null;
    callback(new Record({model: this, data: data}));
  }