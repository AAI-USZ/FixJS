function Month(options) {
    var self = this,
        key;

    Calendar.View.call(this);

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
    this.element = document.querySelector('#month-view');

    this._initEvents();
  }