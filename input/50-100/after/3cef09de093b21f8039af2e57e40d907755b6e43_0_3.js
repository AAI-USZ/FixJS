function relativize (base, url) {
    var $;
    if (url[0] == '/') {
      return ($ = /^(https?:\/\/[^\/]+/.exec(base)) ? $[1] + url : url;
    }
    if (!url.indexOf('http')) {
      return url;
    }
    return /^([^?#]*\/).*$/.exec(base)[1] + url;
  }