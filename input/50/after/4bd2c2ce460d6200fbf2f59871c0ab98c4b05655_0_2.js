function(fn) {
        if (block.total === Infinity) {
          return block.pushAndRun(fn);
        } else {
          return block.push(fn);
        }
      }