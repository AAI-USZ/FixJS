function () {
  this.handshaken = {};
  this.connected = {};
  this.open = {};
  this.closed = {};
  this.rooms = {};
  this.roomClients = {};

  var self = this;

  this.store.subscribe('handshake', function (id, data) {
    self.onHandshake(id, data);
  });

  this.store.subscribe('connect', function (id) {
    self.onConnect(id);
  });

  this.store.subscribe('open', function (id) {
    self.onOpen(id);
  });

  this.store.subscribe('join', function (id, room) {
    self.onJoin(id, room);
  });

  this.store.subscribe('leave', function (id, room) {
    self.onLeave(id, room);
  });

  this.store.subscribe('close', function (id) {
    self.onClose(id);
  });

  this.store.subscribe('dispatch', function (room, packet, volatile, exceptions) {
    self.onDispatch(room, packet, volatile, exceptions);
  });

  this.store.subscribe('disconnect', function (id) {
    self.onDisconnect(id);
  });
}