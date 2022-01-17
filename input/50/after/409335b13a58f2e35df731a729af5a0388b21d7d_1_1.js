function WebSocket (req) {
  var self = this;
  this.wss = new ws.Server({
      noServer: true
    , clientTracking: false
  });
  Socket.call(this, req);
}