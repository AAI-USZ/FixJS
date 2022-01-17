function(rawKvAnnotation) {
  return new Zipkin.KvAnnotation({
    key: rawKvAnnotation.key,
    value: rawKvAnnotation.value,
    annotationType: rawKvAnnotation.annotationType
  });
 }