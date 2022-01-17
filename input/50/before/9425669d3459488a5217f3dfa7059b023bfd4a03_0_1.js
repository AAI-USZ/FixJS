function fireCallback(callback, $el, event, touched) {
    if (typeof callback == 'function')
      callback.call($el[0], event, touched);
  }