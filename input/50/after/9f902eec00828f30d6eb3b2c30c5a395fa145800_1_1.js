function(rawAnnotation) {
  return new Zipkin.Annotation({
    value: rawAnnotation.value,
    timestamp: rawAnnotation.timestamp,
    host: rawAnnotation.host,
    hostName: rawAnnotation.hostname
  });
}