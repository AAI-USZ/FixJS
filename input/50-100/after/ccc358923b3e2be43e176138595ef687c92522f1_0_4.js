function(err, result) {
    if(err) {
      return callback(err);
    }
    if(result.length === 0) {
      return callback(new Error('[payswarm.hash] ' +
        'The data to hash is empty. This error may be caused because ' +
        'a "@context" was not supplied in the input which would cause ' +
        'any terms or prefixes to be undefined. ' +
        'Input:\n' + JSON.stringify(obj, null, 2)));
    }

    var md = crypto.createHash('sha1');
    md.update(result, 'utf8');
    callback(null, md.digest('hex'));
  }