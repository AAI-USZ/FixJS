function() {
    if (req.readyState === 4) {
      var s = req.status;
      callback(s >= 200 && s < 300 || s === 304 ? req : null);
    }
  }