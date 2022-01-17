function (id) {
  if (this.open[id]) {
    delete this.open[id];
  }

  var self = this;

  // we can't remove packest if they are not delivered
  //this.closed[id] = [];


  this.store.subscribe('dispatch:' + id, function (packet, volatile) {
    if (!volatile) {
      self.onClientDispatch(id, packet);
    }
  });
}