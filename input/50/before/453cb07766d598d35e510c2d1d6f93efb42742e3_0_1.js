function() {
  if (new Date() - last > 15000) {
    sendMessage(['done_timeout']);
  }
}