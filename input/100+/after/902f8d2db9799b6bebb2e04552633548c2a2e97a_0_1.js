function (options, callback) {

  // support 'url'
  if (options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if (!options.uri) {
    throw new Error("the URI is required.");
  }

  var diffbot_url = "http://www.diffbot.com/api/article?token=" + this.token + "&url=" + encodeURIComponent(options.uri);

  // process extras
  if (options.callback) {
    diffbot_url += "&callback=" + callback;
  }

  if (options.html) {
    diffbot_url += "&html=1";
  }

  if (options.dontStripAds) {
    diffbot_url += "&dontStripAds=1";
  }

  if (options.tags) {
    diffbot_url += "&tags=1";
  }

  if (options.comments) {
    // experimental
    diffbot_url += "&comments=1";
  }

  if (options.stats) {
    diffbot_url += "&stats=1";
  }

  request({uri: diffbot_url}, function(error, response, body) {
    if (error) {
      callback(error, undefined);
    } else {
      var body_parsed = JSON.parse(body);
      callback(false, body_parsed);
    }
  });
}