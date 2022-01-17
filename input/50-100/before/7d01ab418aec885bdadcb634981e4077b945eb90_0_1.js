function _updateTargetWindowHeight() {
    var height;
    if (IMERender.ime.dataset.hidden) {
      height = 0;
    } else {
      height = IMERender.ime.scrollHeight;
    }
    if (_lastHeight === height)
      return;

    _lastHeight = height;
    var message = {
      action: 'updateHeight',
      keyboardHeight: height,
      hidden: !!IMERender.ime.dataset.hidden
    };

    parent.postMessage(JSON.stringify(message), '*');
  }