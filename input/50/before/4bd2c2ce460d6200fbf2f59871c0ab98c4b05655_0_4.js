function(complete) {
        if (block.total === Infinity) {
          return block.pushAndRun(complete);
        } else {
          return block.push(complete);
        }
      }