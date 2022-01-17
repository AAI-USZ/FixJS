function(name, fn) {
      var block, pushBlock;
      block = this;
      pushBlock = function(fn) {
        if (block.total === Infinity) {
          return block.pushAndRun(fn);
        } else {
          return block.push(fn);
        }
      };
      pushBlock(function(complete) {
        var subBlock;
        return subBlock = block.createSubBlock({
          name: name,
          fn: fn,
          complete: complete
        });
      });
      return this;
    }