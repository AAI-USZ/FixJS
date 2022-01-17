function(element, i) {
          element.resultIndex = index.result + i;

          return compute(
            element,
            { result: index.result + i, pos: index.pos + 1 }
          );
        }