function() {
  for (var name in goog.net.xpc.channels_) {
    var ch = goog.net.xpc.channels_[name];
    if (ch) {
      ch.dispose();
    }
  }
}