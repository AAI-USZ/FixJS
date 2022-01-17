function(data){
          data.has_filtered_spans = data.spans.length > Zipkin.Config.MIN_SPANS_TO_FILTER;

          templatize(TEMPLATES.GET_TRACE, function(template) {

            Zipkin.Base.enableClockSkewBtn();

            /* Construct Zipkin.Span, Zipkin.Annotation, and Zipkin.KvAnnotation objects to pass on */
            var spanMap = {}
              , spans = []
              , annotations = []
              , kvAnnotations = []
              , kvAnnotationsMap = {}
              ;

            $.each(data.spans, function(i, span) {
              var s = Zipkin.fromRawSpan(span);
              spanMap[s.id] = s;
              spans.push(s);
            });

            $.each(data.kv_annotations, function(spanId, kvAs) {
              var span = spanMap[spanId];
              $.each(kvAs, function(i, kvA) {
                var annotation = Zipkin.fromRawKvAnnotation(kvA);
                span.addKvAnnotation(annotation);
                annotation.setSpan(span);

                kvAnnotations.push(annotation);
              });
              kvAnnotationsMap[spanId] = kvAs
            });

            $.each(data.annotations, function(i, val) {
              var spanId = val.id;
              var span = spanMap[spanId];
              var a = Zipkin.fromRawAnnotation(val);

              span.addAnnotation(a);
              a.setSpan(span);
              annotations.push(a);

              // Attach the kv annotations for trace timeline
              if (kvAnnotationsMap.hasOwnProperty(spanId)) {
                var kvAs = kvAnnotationsMap[spanId];
                val.binary_annotations = kvAs;
                val.has_binary_annotations = true;
              } else {
                val.has_binary_annotations = false;
              }
            });

            var content = template.render(data);

            $('#loading-data').hide();
            $('#trace-content').html(content);
            $('#trace-content').show();

            Zipkin.GetTrace.initialize(data.trace, spans, annotations, kvAnnotations);
          });
        }