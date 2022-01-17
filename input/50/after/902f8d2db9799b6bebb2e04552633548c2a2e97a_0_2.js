function(error, response, body) {
    if (error) {
      callback(error, undefined);
    } else {
      var body_parsed = JSON.parse(body);
      callback(false, body_parsed);
    }
  }