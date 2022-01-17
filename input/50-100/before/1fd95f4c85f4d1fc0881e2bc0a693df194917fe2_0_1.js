function(url, params, callback) {
      params || (params = []);
      return $.getJSON(this.canmoreRequestUrl + url + params.join('/') + '?callback=?', function(data) {
        return callback(data);
      });
    }