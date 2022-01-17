function Day(options) {
    var key;

    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }

    this._initEvents();
  }