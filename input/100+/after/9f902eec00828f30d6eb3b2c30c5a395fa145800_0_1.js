function(template) {

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
          }