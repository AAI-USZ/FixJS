function(msg, options, callback) {
  try {
    // convert message from json
    msg = JSON.parse(msg);
  }
  catch(ex) {
    return callback(new Error('[payswarm.decodeAuthorityMessage] ' +
      'The message contains malformed JSON.'));
  }

  // decrypt and verify message
  async.waterfall([
    function(callback) {
      api.decrypt(msg, options, callback);
    },
    function(result, callback) {
      api.verify(result, function(err) {
        if(err) {
          return callback(err);
        }
        callback(null, result);
      });
    }
  ], callback);
}