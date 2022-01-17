function() {
  if (new Date() - last > 20000) {
    sendMessage(['done_timeout']);
  }
}