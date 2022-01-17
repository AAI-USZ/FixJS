function(err, results) {
        files.push(node);
        if (err) {
          doneProcessingNode(err);
          return;
        }
        return doneProcessingNode(null);
      }