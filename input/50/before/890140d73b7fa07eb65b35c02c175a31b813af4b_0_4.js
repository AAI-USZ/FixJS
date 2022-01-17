function(element, i) {
          return compute(
            element,
            { result: index.result + i, pos: index.pos + 1 }
          );
        }