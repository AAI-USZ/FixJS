function _Class(opts) {
      var block, complete, fn, name, parentBlock;
      block = this;
      name = opts.name, fn = opts.fn, parentBlock = opts.parentBlock, complete = opts.complete;
      block.blockName = name;
      if (parentBlock != null) {
        block.parentBlock = parentBlock;
      }
      block.mode = 'sync';
      block.fn = fn;
      _Class.__super__.constructor.call(this, function(err) {
        block.blockAfter(block, err);
        return typeof complete === "function" ? complete(err) : void 0;
      });
      block.blockBefore(block);
      if (block.fn != null) {
        if (block.fn.length === 3) {
          block.total = Infinity;
        }
        try {
          block.fn(function(name, fn) {
            return block.block(name, fn);
          }, function(name, fn) {
            return block.task(name, fn);
          }, function(err) {
            return block.exit(err);
          });
          if (block.fn.length !== 3) {
            block.run();
          }
        } catch (err) {
          block.exit(err);
        }
      } else {
        block.total = Infinity;
      }
      this;

    }