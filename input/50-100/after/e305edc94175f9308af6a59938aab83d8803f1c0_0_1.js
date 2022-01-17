function (err, response, body) {
      if(err) return cb(err);
      log.silly(response.statusCode, "act response statusCode");
      log.silly(body, "act response body");
      if(response.statusCode !== 200) return cb("Bad response: " + util.inspect(body) + " code: " + response.statusCode);
      return cb(undefined, body);
    }