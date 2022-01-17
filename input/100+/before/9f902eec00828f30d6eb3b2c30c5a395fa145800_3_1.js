function(rawSpan) {
  return new Zipkin.Span({
    id            : rawSpan.id,
    parentId      : rawSpan.parent_id,
    name          : rawSpan.name,
    children      : [],

    traceId       : rawSpan.trace_id,
    startTime     : rawSpan.start_time,
    endTime       : rawSpan.start_time + rawSpan.duration,
    duration      : rawSpan.duration,
    services      : rawSpan.service_names,
    annotations   : rawSpan.annotations,
    kvAnnotations : rawSpan.kvAnnotations
  });
}