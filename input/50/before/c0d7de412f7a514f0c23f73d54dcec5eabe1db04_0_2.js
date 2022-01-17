function FlashWS (options) {
  WebSocket.call(this, options);
  this.flashPath = options.flashPath;
}