function uncaughtHandler(er) {
  // if there's an active domain, then handle this there.
  // Note that if this error emission throws, then it'll just crash.
  if (exports.active && !exports.active._disposed) {
    util._extend(er, {
      domain: exports.active,
      domain_thrown: true
    });
    exports.active.emit('error', er);
    exports.active.exit();
  } else if (process.listeners('uncaughtException').length === 1) {
    // if there are other handlers, then they'll take care of it.
    // but if not, then we need to crash now.
    throw er;
  }
}