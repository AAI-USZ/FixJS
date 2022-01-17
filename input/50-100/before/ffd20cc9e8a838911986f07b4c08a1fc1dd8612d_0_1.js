function() {
      // TODO: clear storage.
      this.database && this.database.clear(new RegExp(this.getDataUrl('')));
      this._buffer = {};
      return this;
    }