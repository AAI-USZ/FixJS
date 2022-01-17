function(key, options) {
      var opts = $.extend({}, options),
          keyPath = this.getDataUrl(key),
          data = null;
      if (keyPath in this._buffer) {
        data = this._buffer[keyPath];
      } else if (this.database) {
        data = this.database.get(keyPath, opts);
      }
      if (data) {
        if (data.timestamp && data.timestamp < Date.now()) {
          this.database.remove(keyPath);
          delete this._buffer[keyPath];
        } else {
          this._buffer[keyPath] = data;
        }
      }
      return ($.isPlainObject(data) ? data.value : null);
    }