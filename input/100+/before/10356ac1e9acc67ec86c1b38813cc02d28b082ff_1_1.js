function (packet, volatile) {
  if (this.manager.transports[this.id] && this.manager.transports[this.id].open) {
    this.manager.transports[this.id].onDispatch(packet, volatile);
  } else {
    if (!volatile) {
      this.manager.onClientDispatch(this.id, packet, volatile);
    }

    this.manager.store.publish('dispatch:' + this.id, packet, volatile);
  }
}