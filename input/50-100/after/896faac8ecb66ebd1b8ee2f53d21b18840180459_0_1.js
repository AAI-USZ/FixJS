function(data, callback) {
    if (data && data.length) {
      var err;
      try {
        data = JSON.parse(data);
        err = null;
      } catch (caughtErr) {
        err = caughtErr;
        err.message = 'Failed to parse JSON body: ' + err.message;
      }
      callback(err, data);
    } else {
      callback(null, null);
    }
  }