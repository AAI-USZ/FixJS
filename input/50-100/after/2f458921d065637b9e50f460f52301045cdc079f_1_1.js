function (err) {
    var prefix = '[server.static] (' + http.req.url + ') ';

    if (err) {
      callback(prefix + (err.stack || err));
      return;
    }

    callback(prefix + 'File not found');
  }