function(data, callback) {
    user = data;
    if (!user.twitter) {
      return callback(new Error('This user has no twitter account'));
    }
    twit = new ntwitter({
      consumer_key: config.twitter.consumerKey,
      consumer_secret: config.twitter.consumerSecret,
      access_token_key: user.twitter.token,
      access_token_secret: user.twitter.token_secret
    });
    return twit.verifyCredentials(callback);
  }