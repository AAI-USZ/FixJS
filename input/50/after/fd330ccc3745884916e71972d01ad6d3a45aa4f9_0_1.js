function _notifyShowKeyboard(show) {

    var message = {
      action: show ? 'showKeyboard' : 'hideKeyboard'
    };

    parent.postMessage(JSON.stringify(message), '*');
  }