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
      var words = stemmer.keywordString(values[i] || '')

      words.forEach(function (word) {
        if (word) {
          if (upper)
            newKeywords.addToSet(word);
          else
            newKeywords.addToSet(word.toLowerCase());
        }
      });
    }

    return newKeywords;
  }