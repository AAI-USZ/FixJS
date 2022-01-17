function() {
      // TODO: clear storage.
      var dataUrl = this.getDataUrl(''),
          pattern = dataUrl ? new RegExp(dataUrl) : null;
      this.database && this.database.clear(pattern);
      this._buffer = {};
      return this;
    }