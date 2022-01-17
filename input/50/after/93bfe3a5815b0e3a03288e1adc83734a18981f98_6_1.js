function Month(options) {
    Calendar.View.apply(this, arguments);

    this.controller = this.app.timeController;
    this.children = Object.create(null);
    this._initEvents();
  }