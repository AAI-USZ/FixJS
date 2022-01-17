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
        if (fn.length < 1) {
          try {
            fn();
            return preComplete();
          } catch (err) {
            return preComplete(err);
          }
        } else {
          try {
            return fn(preComplete);
          } catch (err) {
            return preComplete(err);
          }
        }
      });
      return this;
    }