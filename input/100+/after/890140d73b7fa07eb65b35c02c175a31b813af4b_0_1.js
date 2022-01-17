function(node, index) {
        var depths = map(node.elements, function(element, i) {
          element.resultIndex = index.result + i;

          return compute(
            element,
            { result: index.result + i, pos: index.pos + 1 }
          );
        });

        node.posIndex = index.pos;

        return {
          result:
            node.elements.length > 0
              ? Math.max.apply(
                  null,
                  map(depths, function(d, i) { return i + d.result; })
                )
              : 0,

          pos:
            node.elements.length > 0
              ? 1 + Math.max.apply(null, pluck(depths, "pos"))
              : 1
        };
      }