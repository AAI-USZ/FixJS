function (err, result) {
    if(err) return fn(err);
    debug('found %j', err || result || 'none');
    collection.execListener('Get', session, query, result, fn);
  }