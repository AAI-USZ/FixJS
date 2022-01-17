function(url) {
      var sep;
      if ((this.api_key != null) && (url != null)) {
        sep = url.indexOf('?') > 0 ? '&' : '?';
        return url + sep + 'api_key=' + this.api_key;
      } else {
        return url;
      }
    }