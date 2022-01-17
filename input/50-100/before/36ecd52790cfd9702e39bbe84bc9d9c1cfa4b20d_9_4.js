function(url)
  {
    if (this._current_context) {
      var filterfun = function(res) { return res.url == url };
      return this._current_context.resources.filter(filterfun).pop();
    }
    return null;
  }