function(err, results) {
        if (err) {
          doneResolvingDependencyChain(err);
          return;
        }
        files.push(node);
        return doneProcessingNode();
      }