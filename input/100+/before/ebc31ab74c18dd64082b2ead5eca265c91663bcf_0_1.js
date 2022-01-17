function (data) {
    this.websocket.send(data);
    return this;
  }