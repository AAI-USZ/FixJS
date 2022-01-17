function WebSocket (req) {
  var self = this;
  this.wss = new WebSocketServer({
      noServer: true
    , clientTracking: false
  });
  Socket.call(this, req);
}