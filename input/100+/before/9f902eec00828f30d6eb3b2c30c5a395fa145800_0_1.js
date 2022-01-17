function(i, span) {
              var s = Zipkin.fromRawSpan(span);
              spanMap[s.id] = s;
              spans.push(s);
            }