function() {
      var _j, _len1, _results1;
      _results1 = [];
      for (_j = 0, _len1 = blocks.length; _j < _len1; _j++) {
        test = blocks[_j];
        if (!test.isSubset && test.w >= block.w && test.h >= block.h && test !== block) {
          _results1.push(test);
        }
      }
      return _results1;
    }