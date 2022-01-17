function(name, fn) {
      var block, push;
      block = this;
      push = function(complete) {
        if (block.total === Infinity) {
          return block.pushAndRun(complete);
        } else {
          return block.push(complete);
        }
      };
      push(function() {
        var subBlock;
        return subBlock = block.createSubBlock(name, fn, block);
      });
      return this;
    }