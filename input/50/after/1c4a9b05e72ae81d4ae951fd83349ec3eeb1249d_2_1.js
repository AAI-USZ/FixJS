function(key) {
      var enableCache = this.options.enableCacheBuffer;
      return enableCache ? this._buffer[key] : null;
    }