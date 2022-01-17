function(blocks) {
  var block, candidate, candidates, coords, test, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = blocks.length; _i < _len; _i++) {
    block = blocks[_i];
    candidates = (function() {
      var _j, _len1, _results1;
      _results1 = [];
      for (_j = 0, _len1 = blocks.length; _j < _len1; _j++) {
        test = blocks[_j];
        if (!test.isSubset && test.w >= block.w && test.h >= block.h && test !== block) {
          _results1.push(test);
        }
      }
      return _results1;
    })();
    console.log("Iterating through block parent candidates", candidates.length);
    _results.push((function() {
      var _j, _len1, _results1;
      _results1 = [];
      for (_j = 0, _len1 = candidates.length; _j < _len1; _j++) {
        candidate = candidates[_j];
        coords = imageSearch(block.pixels, candidate.pixels);
        if (coords) {
          block.isSubset = true;
          block.coords = coords;
          if (!('subsets' in candidate)) {
            candidate.subsets = [];
          }
          candidate.subsets.push(block);
          break;
        } else {
          _results1.push(void 0);
        }
      }
      return _results1;
    })());
  }
  return _results;
}