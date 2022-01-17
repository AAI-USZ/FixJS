function _updateTargetWindowHeight() {
    var height;
    if (IMERender.ime.dataset.hidden) {
      height = 0;
    } else {
      height = IMERender.ime.scrollHeight;
    }

    var message = {
      action: 'updateHeight',
      keyboardHeight: height,
      hidden: !!IMERender.ime.dataset.hidden
    };

    parent.postMessage(JSON.stringify(message), '*');
  }