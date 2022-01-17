function(err, resp, body) {
    var email = false;

    if (err) {
      callback(err);
      return;
    }

    try {
      var jsonResp = JSON.parse(body);
      if (jsonResp.status === 'okay') {
        email = jsonResp.email;
      } else {
        // Response status is 'not okay'
        callback(jsonResp);
        return;
      }
    } catch (err) {
      callback(err);
      return;
    }

    callback(null, email);
  }