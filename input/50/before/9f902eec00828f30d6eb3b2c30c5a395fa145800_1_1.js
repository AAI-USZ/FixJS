function(rawAnnotation) {
  return new Zipkin.Annotation({
    value: rawAnnotation.annotation,
    timestamp: rawAnnotation.timestamp,
    host: rawAnnotation.host,
    hostName: rawAnnotation.hostname
  });
}