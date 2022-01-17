function () {
  if (!this.socket) return;
  FlashWS.prototype.doClose.call(this);
}