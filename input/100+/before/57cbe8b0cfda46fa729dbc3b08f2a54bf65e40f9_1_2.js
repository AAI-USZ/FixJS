function invokeApi(url, accessToken, callback) {

    callback = callback || emptyCallback;

    var parsedUrl = urlParser.parse(url, true);

    if(!accessToken) {
      parsedUrl.query.client_id = config.secrets.clientId;
      parsedUrl.query.client_secret = config.secrets.clientSecret;
    }
    else {
      parsedUrl.query.oauth_token = accessToken;
    }

    if(config.foursquare.version) {
      parsedUrl.query.v = config.foursquare.version;
    }

    parsedUrl.search = "?" + qs.stringify(parsedUrl.query);
    url = urlParser.format(parsedUrl);

    retrieve(url,
      function(error, status, result) {
        if(error) {
          callback(error);
        }
        else {
          logger.trace(sys.inspect(result));
          callback(null, status, result);
        }
      });
  }