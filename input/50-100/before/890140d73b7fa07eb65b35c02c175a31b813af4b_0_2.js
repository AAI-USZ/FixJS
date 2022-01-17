function(node, index) {
        var depths = map(node.alternatives, function(alternative) {
          return compute(alternative, index);
        });

        node.resultIndex = index.result;

        return {
          result: Math.max.apply(null, pluck(depths, "result")),
          pos:    Math.max.apply(null, pluck(depths, "pos"))
        };
      }