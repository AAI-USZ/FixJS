function (err, results) {
      debug("Get listener called back with", err || results);
      if(err) {
        return fn(err);
      }
      if(typeof query.id === 'string' && Array.isArray(results)) return fn(null, results[0]);
      fn(null, results);
    }