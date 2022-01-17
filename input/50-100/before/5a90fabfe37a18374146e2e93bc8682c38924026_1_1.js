function(options) {
      _.bindAll(this, 'fail', 'uploading', 'done');
      options = options || {};
      this.url = options.url || '/upload';
      this.data = options.data || {};
      this._name = options.name || 'files[]';
      this._multiple = options.multiple || true;
      this._enabled = options.enabled || true;
      return this;
    }