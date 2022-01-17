function () {
    var self = this;

    var values = fields.map(function (field) {
      return self.get(field);
    });

    if (fn) {
      var res = fn.call(self);
      if (undefined !== res) {
        if (!Array.isArray(res)) res = [res];
        values = values.concat(res);
      }
    }

    this.set('_keywords', []);
    var keywords = this._keywords;
    var i = values.length;

    while (i--) {
      var processed = stemmer.metaphoneString(values[i] || '');

      processed.forEach(function (mKey) {
        if (mKey) {
          keywords.addToSet(mKey);
        }
      });
    }

    return keywords;
  }