function _Class(name, initFunction, parentBlock) {
      var block;
      block = this;
      _Class.__super__.constructor.call(this, function(err) {
        var _ref;
        block.blockAfter(block, err);
        return (_ref = block.parentBlock) != null ? _ref.complete(err) : void 0;
      });
      block.blockName = name;
      if (parentBlock != null) {
        block.parentBlock = parentBlock;
      }
      block.mode = 'sync';
      block.initFunction = initFunction;
      block.blockBefore(block);
      if (block.initFunction != null) {
        if (block.initFunction.length === 3) {
          block.total = Infinity;
        }
        try {
          block.initFunction(function(name, fn) {
            return block.block(name, fn);
          }, function(name, fn) {
            return block.task(name, fn);
          }, function(err) {
            return block.exit(err);
          });
        } catch (err) {
          block.exit(err);
        }
        if (block.initFunction.length !== 3) {
          block.run();
        }
      } else {
        block.total = Infinity;
      }
      this;

    }