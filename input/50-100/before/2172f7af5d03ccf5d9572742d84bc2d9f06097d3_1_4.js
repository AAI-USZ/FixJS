function(entityNo, entity) {
          // offsets given as array of (start, end) pairs; take
	  // "first" start and "last" end (order not actually guaranteed)
          var spans = entity[2];
	  var start = spans[0][0];
	  var end   = spans[spans.length-1][1];
          var span =
              //      (id,        type,      from,  to,   generalType)
              new Span(entity[0], entity[1], start, end , 'entity');
          data.spans[entity[0]] = span;
        }