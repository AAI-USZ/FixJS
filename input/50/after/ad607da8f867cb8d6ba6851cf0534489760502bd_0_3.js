function() {
  for (var name in goog.net.xpc.channels_) {
    goog.dispose(goog.net.xpc.channels_[name]);
  }
}