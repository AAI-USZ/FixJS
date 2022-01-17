function (err, results) {
      debug("Get listener called back with", err || results);
      if(typeof query.id === 'string' && (results && results.length === 0) || !results) {
        err = err || {
          message: 'not found',
          statusCode: 404
        }
        debug('could not find object by id %s', query.id);
      }
      if(err) {
        return fn(err);
      }
      if(typeof query.id === 'string' && Array.isArray(results)) return fn(null, results[0]);
      fn(null, results);
    }