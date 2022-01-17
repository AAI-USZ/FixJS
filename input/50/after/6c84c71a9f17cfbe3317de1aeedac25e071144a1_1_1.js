function() {
      return this._context ||
             (this._context = new nativeNroonga.Database(databasePath));
    }