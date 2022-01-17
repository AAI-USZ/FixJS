function(i, kvA) {
                var annotation = Zipkin.fromRawKvAnnotation(kvA);
                span.addKvAnnotation(annotation);
                annotation.setSpan(span);

                kvAnnotations.push(annotation);
              }