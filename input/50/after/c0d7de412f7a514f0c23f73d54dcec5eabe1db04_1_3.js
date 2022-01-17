function () {
  if (!this.socket) return;
  var self = this;
  WebSocket.__addTask(function() {
    WS.prototype.doClose.call(self);
  });
}