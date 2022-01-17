function (error, content) {
    if (error) return callback(error, null);

    callback(null, removeBOM(content));
  }