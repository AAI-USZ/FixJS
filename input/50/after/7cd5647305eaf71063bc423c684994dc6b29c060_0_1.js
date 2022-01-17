function (err) {
    var prefix = 'Static file (' + http.req.url + ') ';

    if (err) {
      callback(prefix + (err.stack || err));
      return;
    }

    callback(prefix + 'File not found');
  }