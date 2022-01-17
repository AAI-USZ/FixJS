function(url, params, callback) {
      var requestUrl;
      params || (params = []);
      requestUrl = this.canmoreRequestUrl + url + params.join('/') + '?callback=?';
      this.log("Request url is " + requestUrl);
      return $.getJSON(requestUrl, function(data) {
        return callback(data);
      });
    }