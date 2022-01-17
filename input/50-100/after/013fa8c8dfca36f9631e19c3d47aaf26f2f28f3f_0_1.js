function(err, res, body) {
    try {
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
    } catch (e) {
      return callback(e);
    }
    if (body.errors) {
      return callback(new Error(body.errors.join('\n')));
    }
    return callback(null, body);
  }