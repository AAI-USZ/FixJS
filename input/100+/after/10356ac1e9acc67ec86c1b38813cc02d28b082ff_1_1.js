function (packet, volatile) {
  if (this.manager.transports[this.id] && this.manager.transports[this.id].open) {
    this.manager.transports[this.id].onDispatch(packet, volatile);
    this.manager.store.publish('dispatched', this.id, [packet]);
  } else {
    if (!volatile) {
    //console.error('not  conected', packet);
      this.manager.onClientDispatch(this.id, packet, volatile);
    }

    this.manager.store.publish('dispatch:' + this.id, packet, volatile);
  }
}