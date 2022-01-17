function(photo_id) {
  var photo, twit, user;
  twit = null;
  photo = null;
  user = null;
  return invoke(function(data, callback) {
    return model.photo.findOne({
      _id: photo_id
    }, callback);
  }).then(function(data, callback) {
    photo = data;
    return model.user.findOne({
      _id: photo._user
    }, callback);
  }).then(function(data, callback) {
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
  }).then(function(data, callback) {
    var length, photo_name, photo_url, tweet, tweet_format, url_length;
    photo_url = "http://" + (_.first(_.keys(config.domains))) + "/" + user.username + "/" + photo.slug;
    tweet_format = "" + helpers.heart + " %s [pic] %s " + config.twitter.hashtag;
    url_length = 20;
    length = 120 - (_.str.sprintf(tweet_format, '', '').length + url_length);
    photo_name = _.str.truncate(photo.name, length);
    tweet = _.str.sprintf(tweet_format, photo_name, photo_url);
    return twit.updateStatus(tweet, callback);
  }).rescue(function(err) {
    return process.exit(1);
  }).end(null, function(data) {
    return process.exit(1);
  });
}