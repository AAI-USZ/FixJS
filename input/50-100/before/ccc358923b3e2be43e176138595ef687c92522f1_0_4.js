function(err, result) {
    if(err) {
      return callback(err);
    }
    var md = crypto.createHash('sha1');
    md.update(result, 'utf8');
    callback(null, md.digest('hex'));
  }