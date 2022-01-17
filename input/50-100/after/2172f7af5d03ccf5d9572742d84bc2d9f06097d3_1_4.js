function(entityNo, entity) {
          // offsets given as array of (start, end) pairs
          var span =
              //      (id,        type,      offsets,   generalType)
              new Span(entity[0], entity[1], entity[2], 'entity');
          data.spans[entity[0]] = span;
        }