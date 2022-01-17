function Abstract(db) {
    this.db = db;
    this._cached = Object.create(null);
    Calendar.Responder.call(this);
  }