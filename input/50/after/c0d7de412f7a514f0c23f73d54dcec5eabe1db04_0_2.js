function FlashWS (options) {
  WS.call(this, options);
  this.flashPath = options.flashPath;
  this.policyPort = options.policyPort;
}