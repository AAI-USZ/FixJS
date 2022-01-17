function() {
      var _j, _len1, _results;
      _results = [];
      for (_j = 0, _len1 = blocks.length; _j < _len1; _j++) {
        test = blocks[_j];
        if (!test.isSubset && test.w >= block.w && test.h >= block.h && test !== block) {
          _results.push(test);
        }
      }
      return _results;
    }