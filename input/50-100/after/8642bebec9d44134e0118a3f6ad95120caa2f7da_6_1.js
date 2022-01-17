function end() {
  var hadErr;
  this.connected = false;

  try {
    this.socket.end();
  } catch (err) {
    hadErr = true;
    this.emit('error', err);
  }

  this.emit('close', hadErr);
}