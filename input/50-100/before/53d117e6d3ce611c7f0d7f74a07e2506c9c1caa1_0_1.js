function() {
    if (req.readyState === 4) {
      var s = req.status;
      if (!s && d3_xhrLocal && !d3_xhrCrossDomain(url)) {
        s = req.responseText ? 200 : 404;
      }
      callback(s >= 200 && s < 300 || s === 304 ? req : null);
    }
  }