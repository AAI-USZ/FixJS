function unwatchFile_asyncFs(options) {
  var dir_path = options.path;
  var event_emitter = cache[options.path];
  event_emitter.unwatch();
  delete event_emitter;
  delete cache[options.path];
}