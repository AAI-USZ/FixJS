function Db(name) {
    this.name = name;
    this._stores = {};

    Calendar.Responder.call(this);
  }