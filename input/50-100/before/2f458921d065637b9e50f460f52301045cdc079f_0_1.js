function (err) {
    var prefix = '[server.fontomas.font.download] (' + http.req.url + ')';

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