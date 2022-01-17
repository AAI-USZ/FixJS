function(i, span) {
              span.startTime = span.startTimestamp - traceStartTime;
              span.endTime = span.endTimestamp - traceStartTime;

              var s = Zipkin.fromRawSpan(span);
              spanMap[s.id] = s;
              spans.push(s);

              annotations = s.getAnnotations();
              kvAnnotations = s.getKvAnnotations();
            }