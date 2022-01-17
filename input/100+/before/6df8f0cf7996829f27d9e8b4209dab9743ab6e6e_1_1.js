function (opts) {
      this.usingSessions = true

      opts || (opts = {});

      // The following this._* properties are used in setupSocketAuth
      this._sessionKey = opts.key || (opts.key = 'connect.sid');
      this._sessionSecret = opts.secret;
      var sessStore = this._sessionStore = opts.store;

      if (! sessStore) {
        sessStore = this._sessionStore = opts.store = new MemoryStore;
      }

      patchSessionStore(sessStore, this);

      return createSessionMiddleware(opts);
    }