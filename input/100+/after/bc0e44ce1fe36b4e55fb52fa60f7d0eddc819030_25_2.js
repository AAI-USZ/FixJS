function() {
      var db = new Calendar.Db('b2g-test-calendar');
      this._lastDb = db;
      return this._lastDb;
    }