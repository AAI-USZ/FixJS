function (id, packet) {
  if (!this.closed[id]) {
    this.closed[id] = [];
  }

  this.closed[id].push(packet);
}