function (id) {
  if (this.open[id]) {
    delete this.open[id];
  }

  this.closed[id] = [];

  var self = this;

  this.store.subscribe('dispatch:' + id, function (packet, volatile) {
    if (!volatile) {
      self.onClientDispatch(id, packet);
    }
  });
}