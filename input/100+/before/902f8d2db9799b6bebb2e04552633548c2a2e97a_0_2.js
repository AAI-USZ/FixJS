function (options, callback) {
  for (i in options) {
    this[i] = options[i];
  }

  var options = this;

  // support 'url'
  if (options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if (!options.uri) {
    throw new Error("the URI is required.");
  }

  diffbot_url = "http://www.diffbot.com/api/frontpage?token=" + this.token + "&url=" + encodeURIComponent(options.uri) + "&format=json";

  request({uri: diffbot_url}, function(error, response, body) {
    if (error) {
      callback(error, undefined);
    } else {
      body_parsed = JSON.parse(body);
      callback(false, body_parsed);
    }
  });
}