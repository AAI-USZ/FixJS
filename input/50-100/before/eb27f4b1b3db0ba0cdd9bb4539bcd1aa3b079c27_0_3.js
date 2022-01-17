function generate (url, callback) {
    if (templates[url]) {
      xmlify(templates[url], callback);
    } else {
      resolver(url, "text/xml", check(callback, function (doc) {
        xmlify(templates[url] = { url: url, doc: doc }, callback);
      }));
    }
  }