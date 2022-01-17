function(equivNo, equiv) {
          // equiv: ['*', 'Equiv', spanId...]
          equiv[0] = "*" + equivNo;
          var equivSpans = equiv.slice(2);
          var okEquivSpans = [];
          // collect the equiv spans in an array
          $.each(equivSpans, function(equivSpanNo, equivSpan) {
            if (data.spans[equivSpan]) okEquivSpans.push(equivSpan);
            // TODO: #404, inform the user with a message?
          });
          // sort spans in the equiv by their midpoint
          okEquivSpans.sort(function(a, b) {
            var aSpan = data.spans[a];
            var bSpan = data.spans[b];
            var tmp = aSpan.from + aSpan.to - bSpan.from - bSpan.to;
            if (tmp) {
              return tmp < 0 ? -1 : 1;
            }
            return 0;
          });
          // generate the arcs
          var len = okEquivSpans.length;
          for (var i = 1; i < len; i++) {
            var eventDesc = data.eventDescs[equiv[0] + '*' + i] =
                //                   (id,          triggerId,           roles,                         klass)
                new EventDesc(okEquivSpans[i - 1], okEquivSpans[i - 1], [[equiv[1], okEquivSpans[i]]], 'equiv');
            eventDesc.leftSpans = okEquivSpans.slice(0, i);
            eventDesc.rightSpans = okEquivSpans.slice(i);
          }
        }