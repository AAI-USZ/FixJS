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
      var words = stemmer.keywordString(values[i] || '')

      words.forEach(function (word) {
        if (word) {
          if (upper)
            keywords.addToSet(word);
          else
            keywords.addToSet(word.toLowerCase());
        }
      });
    }

    return keywords;
  }