function traceSource(writer, abc) {
  var tracer = SourceTracer(writer);
  abc.scripts.forEach(function (script) {
    tracer.traceTraits(script.traits);
  });
}