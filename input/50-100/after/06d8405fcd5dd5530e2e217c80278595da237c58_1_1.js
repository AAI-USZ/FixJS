function (err) {
    var prefix = '[server.static] (' + http.req.url + ')';

    if (err && err.code) {
      callback(prefix + 'File not found');
      return;
    }

    if (err) {
      callback(prefix + 'Unexpected error: ' + (err.stack || err));
      return;
    }

    callback(prefix + 'Generic error');
  }