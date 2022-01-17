function _init() {

    // Support function for render
    function isSpecialKeyObj(key) {
      var hasSpecialCode = key.keyCode !== KeyEvent.DOM_VK_SPACE &&
                           key.keyCode &&
                           specialCodes.indexOf(key.keyCode) !== -1;
      return hasSpecialCode || key.keyCode <= 0;
    }
    IMERender.init(_getUpperCaseValue, isSpecialKeyObj, _onScroll);

    // Attach event listeners
    for (var event in _imeEvents) {
      var callback = _imeEvents[event] || null;
      if (callback)
        IMERender.ime.addEventListener(event, callback.bind(this));
    }
    _dimensionsObserver.observe(IMERender.ime, _dimensionsObserverConfig);
  }