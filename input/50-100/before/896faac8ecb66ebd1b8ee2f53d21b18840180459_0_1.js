function(data, callback) {
    if (data && data.length) {
      try {
        data = JSON.parse(data);
        err = null;
      } catch (err) {
        err.message = 'Failed to parse JSON body: ' + err.message;
      }
      callback(err, data);
    } else {
      callback(null, null);
    }
  }