function(data, callback) {
    var hashtag, length, photo_name, photo_url, tweet, tweet_format, url_length;
    photo_url = "http://" + (_.first(_.keys(config.domains))) + "/" + user.username + "/" + photo.slug;
    hashtag = config.twitter.hashtag ? ' ' + config.twitter.hashtag : '';
    tweet_format = "" + helpers.heart + " %s [pic] %s%s";
    url_length = 20;
    length = 120 - (_.str.sprintf(tweet_format, '', '', hashtag).length + url_length);
    photo_name = _.str.truncate(photo.name, length);
    tweet = _.str.sprintf(tweet_format, photo_name, photo_url, hashtag);
    console.log('then tweet status');
    console.log(tweet);
    twit.updateStatus(tweet, callback);
    return console.log("tweet status " + photo._id + " - " + photo.slug);
  }