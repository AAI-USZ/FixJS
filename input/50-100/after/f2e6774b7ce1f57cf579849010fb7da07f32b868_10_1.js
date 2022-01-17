function Day(options) {
    var key;

    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }

    this.element = document.querySelector('#months-day-view');
    this._initEvents();

  }