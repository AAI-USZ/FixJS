function(err, data) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data);
    }
  }