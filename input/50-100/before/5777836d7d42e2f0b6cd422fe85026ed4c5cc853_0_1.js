function() {
      var self = this;
      this._columnType = {};
      _(this.get('schema')).each(function(s) {
        self._columnType[s[0]] = s[1];
      });
    }