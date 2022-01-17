function (room, packet, volatile, exceptions) {
  if (this.rooms[room]) {
    for (var i = 0, l = this.rooms[room].length; i < l; i++) {
      var id = this.rooms[room][i];

      if (!~exceptions.indexOf(id)) {
        if (this.transports[id] && this.transports[id].open) {
          this.transports[id].onDispatch(packet, volatile);
          this.store.publish('dispatched', id, [packet]);
        } else if (!volatile) {
          this.onClientDispatch(id, packet);
        }
      }
    }
  }
}