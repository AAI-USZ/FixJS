function (err, data) {
    if (err) {
      if (err.errno == 2) {
        callback(null);
        return this;
      } else {
        throw err;
      }
    }
    this.data[key] = JSON.parse(data);
    callback(this.data[key]);
  }