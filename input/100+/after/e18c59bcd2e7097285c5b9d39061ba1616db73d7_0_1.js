function(data, callback) {
    var length, photo_name, photo_url, tweet, tweet_format, url_length;
    create(photo(url));
    photo_url = "http://" + (_.first(_.keys(config.domains))) + "/" + user.username + "/" + photo.slug;
    tweet_format = "" + helpers.heart + " %s [pic] %s " + config.twitter.hashtag;
    url_length = 20;
    length = 120 - (_.str.sprintf(tweet_format, '', '').length + url_length);
    photo_name = _.str.truncate(photo.name, length);
    tweet = _.str.sprintf(tweet_format, photo_name, photo_url);
    console.log('then tweet status');
    twit.updateStatus(tweet, callback);
    return console.log("tweet status " + photo._id + " - " + photo.slug);
  }