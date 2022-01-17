function() {
      return this._context ||
             (this._context = new nroonga.Database(databasePath));
    }