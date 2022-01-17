function callApi(path, accessToken, params, callback, method) {

    var url = config.foursquare.apiUrl + path;

    if(params) {
      if((params.lat && !params.lng) || (!params.lat && params.lng)) {
        callback(new Error("parameters: if you specify a longitude or latitude, you must include BOTH."));
        return;
      }

      if(params.lat && params.lng) {
        params.ll = params.lat + "," + params.lng;
        delete params.lat;
        delete params.lng;
      }

      url += "?" + qs.stringify(params);
    }
    logger.trace("URL: " + url);
    invokeApi(url, accessToken, function(error, status, result) {
      extractData(url, status, result, callback);
    }, method);
  }