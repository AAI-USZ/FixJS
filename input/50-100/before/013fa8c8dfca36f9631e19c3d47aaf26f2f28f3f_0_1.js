function(err, res, body) {
    try {
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
    } catch (e) {
      return callback(e);
    }
    if (body.errors) return callback(body.errors);
    return callback(null, body);
  }