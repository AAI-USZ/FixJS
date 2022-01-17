function(rawSpan) {
  var span = new Zipkin.Span({
    id            : rawSpan.id,
    parentId      : rawSpan.parentId,
    name          : rawSpan.name,
    children      : [],

    traceId       : rawSpan.traceId,
    startTime     : rawSpan.startTime,
    endTime       : rawSpan.startTime + rawSpan.duration,
    duration      : rawSpan.duration,
    services      : rawSpan.services,
    annotations   : [],
    kvAnnotations : [],
  });
  var annotations = $.map(rawSpan.annotations, function(a) {
    var ann = Zipkin.fromRawAnnotation(a);
    ann.setSpan(span);
    return ann;
  });
  var kvAnnotations = $.map(rawSpan.binaryAnnotations, function(b) {
    var ann =  Zipkin.fromRawKvAnnotation(b);
    ann.setSpan(span);
    return ann;
  });
  span.setAnnotations(annotations);
  span.setKvAnnotations(kvAnnotations);
  return span;
}