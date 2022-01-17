function BesioStream(client) {
  Stream.call(this);

  this.log = client.log;
  this.client = client;

  this.id = client.streamCounter++;
  client.streams[this.id] = this;

  this._writeQueue = [];

  this.remoteId = null;

  this.readable = true;
  this.writable = true;

  var self = this;
  this.onclientdrain = function () {
    if (!self.remotePaused) {
      self.emit('drain');
    }
  };
  this.onclientclose = function() {
    self.emit('close');
    self.destroy();
  };
  client.on('drain', this.onclientdrain);
  client.on('close', this.onclientclose);
}