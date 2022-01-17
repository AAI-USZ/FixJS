function(err, resp, body) {
    var email = false;

    if (err) {
      return callback(err);
    }

    try {
      var jsonResp = JSON.parse(body);
      if (jsonResp.status === 'okay') {
        email = jsonResp.email;
      } else {
        // Response status is 'not okay'
        return callback(jsonResp);
      }
    } catch (err) {
      return callback(err);
    }

    return callback(null, email);
  }