function(node, index) {
        var depths = map(node.alternatives, function(alternative) {
          alternative.resultIndex = node.resultIndex;

          return compute(alternative, index);
        });

        return {
          result: Math.max.apply(null, pluck(depths, "result")),
          pos:    Math.max.apply(null, pluck(depths, "pos"))
        };
      }