function Db(name) {
    this.name = name;
    this._stores = Object.create(null);

    Calendar.Responder.call(this);
  }