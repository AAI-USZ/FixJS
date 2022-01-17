function(content) {
    var regexp, url, urlIndex, urls, _i, _len;
    regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
    urls = content.match(regexp);
    if (urls) {
      for (_i = 0, _len = urls.length; _i < _len; _i++) {
        url = urls[_i];
        urlIndex = content.indexOf(url);
        if (urlIndex === 0 || (content.charAt(urlIndex - 1) !== '(' && content.charAt(urlIndex - 1) !== "[")) {
          content = content.replace(url, "[" + url + "]" + "(" + url + ")");
        }
      }
    }
    return content;
  }