function (callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit');
      this.eq(0).trigger(event);
      if (!event.defaultPrevented) this.get(0).submit()
    }
    return this;
  }