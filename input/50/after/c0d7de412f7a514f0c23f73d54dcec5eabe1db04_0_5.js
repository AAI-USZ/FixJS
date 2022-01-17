function () {
  if (typeof this.socket !== 'undefined') {
    this.socket.close();
  }
}