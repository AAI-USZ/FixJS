function _init() {
    if (window.localStorage && window.sessionStorage) {
      if (_checkArgument('Undefined', window.RS)) {
        window.RS = {};
      }

      window.RS = {
        put: put,
        get: get,
        remove: remove,
        clear: clear,
        is: is
      };
    } else {
      throw new Error('This browser have no storage.');
    }
  }