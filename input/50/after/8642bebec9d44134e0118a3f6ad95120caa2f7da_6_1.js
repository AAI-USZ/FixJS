function destroy() {
  this.removeAllListeners();

  try {
    this.socket.end();
    this.socket.destroy();
  } catch (err) {}

  this.emit('destroy');
}