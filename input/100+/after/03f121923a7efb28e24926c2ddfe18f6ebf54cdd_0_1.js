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

    var newKeywords = new mongoose.Types.Array([], keywordsPath, this);
    var i = values.length;

    while (i--) {
      var keys = stemmer.metaphoneString(values[i] || '');

      keys.forEach(function (mKey) {
        if (mKey) newKeywords.addToSet(mKey);
      });
    }

    return newKeywords;
  }