function Account() {
    Calendar.Store.Abstract.apply(this, arguments);

    this._accounts = {};
  }