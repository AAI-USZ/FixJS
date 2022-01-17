function fetch (url, callback) {
    if (templates[url]) callback(null, templates[url]);
    else resolver(url, "text/xml", check(callback, function (doc) {
      callback(null,  templates[url] = { url: url, doc: doc, funcs: {} });
    }));
  }