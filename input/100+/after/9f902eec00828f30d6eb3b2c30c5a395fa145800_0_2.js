function(data){
          data.has_filtered_spans = data.trace.spans.length > Zipkin.Config.MIN_SPANS_TO_FILTER;

          /* Data comes in with microsecond timestamp/durations, so we have to sanitize it first */
          data.traceSummary.duration = data.traceSummary.durationMicro / 1000;
          data.traceSummary.startTimestamp /= 1000;
          data.traceSummary.endTimestamp /= 1000;
          data.trace.startTimestamp /= 1000;
          data.trace.endTimestamp /= 1000;
          data.trace.duration /= 1000;

          $.each(data.trace.spans, function(i, span) {
            span.startTimestamp /= 1000;
            span.duration /= 1000;

            $.each(span.annotations, function(j, ann) {
              ann.timestamp /= 1000;
            });
          });

          $.each(data.traceTimeline.annotations, function(i, ann) {
            ann.timestamp /= 1000;
          });

          /* Some fields for the template */
          data.timeAgoInWords = Zipkin.Util.timeAgoInWords(data.trace.startTimestamp);
          var date = new Date(data.trace.startTimestamp);
          data.date = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("-");
          data.time = [
            date.getHours(), 
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(), 
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()].join(":");
          data.duration = data.trace.duration;

          templatize(TEMPLATES.GET_TRACE, function(template) {

            Zipkin.Base.enableClockSkewBtn();

            /* Construct Zipkin.Span, Zipkin.Annotation, and Zipkin.KvAnnotation objects to pass on */
            var spanMap = {}
              , spans = []
              , annotations = []
              , kvAnnotations = []
              , kvAnnotationsMap = {}
              ;

            var traceStartTime = data.trace.startTimestamp;

            $.each(data.trace.spans, function(i, span) {
              span.startTime = span.startTimestamp - traceStartTime;
              span.endTime = span.endTimestamp - traceStartTime;

              var s = Zipkin.fromRawSpan(span);
              spanMap[s.id] = s;
              spans.push(s);

              annotations = s.getAnnotations();
              kvAnnotations = s.getKvAnnotations();
            });

            var content = template.render(data);

            $('#loading-data').hide();
            $('#trace-content').html(content);
            $('#trace-content').show();

            Zipkin.GetTrace.initialize(data.trace, spans, annotations, kvAnnotations);
          });
        }