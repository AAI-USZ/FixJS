function Month(options) {
    Calendar.View.apply(this, arguments);

    this.controller = this.app.timeController;
    this.children = {};
    this._initEvents();
  }