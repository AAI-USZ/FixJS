function (err) {
    var prefix = '[server.static] ',
        suffix = ' (' + http.req.url + ')';

    if (err) {
      callback(prefix + (err.message || err) + suffix +
               (err.stack ? ('\n' + err.stack) : ''));
      return;
    }

    callback(prefix + 'File not found' + suffix);
  }