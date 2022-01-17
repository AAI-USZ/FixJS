function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = blocks.length; _i < _len; _i++) {
      block = blocks[_i];
      if (!block.isSubset) {
        _results.push(block);
      }
    }
    return _results;
  }