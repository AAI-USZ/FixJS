function() {
    var fieldIndex;
    return ((function() {
      var _results;
      _results = [];
      for (fieldIndex in this.fields) {
        _results.push(fieldIndex);
      }
      return _results;
    }).call(this)).filter((function(fi) {
      return this.fields[fi].typeID === 37;
    }), this);
  }