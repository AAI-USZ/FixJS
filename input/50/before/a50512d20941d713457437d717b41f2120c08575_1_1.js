function extractOrigin(url) {
      if (!/^https?:\/\//.test(url)) url = window.location.href;
      var m = /^(https?:\/\/[-_a-zA-Z\.0-9:]+)/.exec(url);
      if (m) return m[1];
      return url;
    }