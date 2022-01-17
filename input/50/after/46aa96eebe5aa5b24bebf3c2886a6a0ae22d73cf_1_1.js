function (err, results) {
      if(err) return fn(err);
      if(query.id) return fn(null, results[0]);
      fn(null, results);
    }