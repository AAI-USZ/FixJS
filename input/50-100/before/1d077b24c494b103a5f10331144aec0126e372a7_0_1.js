function() {
      if (this._settings.labels) {
        this._settings.el.append('\
            <span class="label min"></span>\
            <span class="label current"></span>\
            <span class="label max"></span>');
      }
      if (this._settings.bar) this._settings.el.append('<div class="bar"></div>');
      return this._settings.el.append('<a href="#" class="handle"></a>');
    }