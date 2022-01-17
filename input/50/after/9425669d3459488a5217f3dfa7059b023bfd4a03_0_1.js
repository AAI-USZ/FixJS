function fireCallback(callback, $el, event, touched) {
    if (typeof callback == 'function')
      return callback.call($el[0], event, touched);
  }