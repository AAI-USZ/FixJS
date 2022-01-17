function(name, fn) {
      var block, pushTask;
      block = this;
      pushTask = function(complete) {
        if (block.total === Infinity) {
          return block.pushAndRun(complete);
        } else {
          return block.push(complete);
        }
      };
      pushTask(function(complete) {
        var preComplete;
        preComplete = function(err) {
          block.blockTaskAfter(block, name, err);
          return complete(err);
        };
        block.blockTaskBefore(block, name);
        return balUtilFlow.fireWithOptionalCallback(fn, [preComplete]);
      });
      return this;
    }