function Month(options) {
    var self = this,
        key;

    if (typeof(options) === 'undefined') {
      options = {};
    }

    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }

    this.selectedDay = null;
    this.children = {};

    Calendar.Responder.call(this);

    this._initEvents();
  }