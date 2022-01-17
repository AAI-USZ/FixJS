function _init() {
    IMERender.init();
    for (var event in _imeEvents) {
      var callback = _imeEvents[event] || null;
      if (callback)
        IMERender.ime.addEventListener(event, callback.bind(this));
    }
  }