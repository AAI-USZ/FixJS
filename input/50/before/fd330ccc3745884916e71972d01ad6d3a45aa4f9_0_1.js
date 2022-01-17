function _notifyShowKeyboard(show) {

    var message = {
      action: (show == true) ? 'showKeyboard' : 'hideKeyboard'
    };

    parent.postMessage(JSON.stringify(message), '*');
  }