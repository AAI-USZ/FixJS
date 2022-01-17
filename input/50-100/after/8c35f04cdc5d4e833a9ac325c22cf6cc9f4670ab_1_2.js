function destroy() {
  // this should be forcibly remove EVERY listener
  this.removeAllListeners();

  if (this.socket) {
    try {
      this.socket.end(); // send FIN
      this.socket.destroy(); // make sure fd's are gone
    }
    catch (ex) {
      // do nothing on errors
    }
  }

  // clear buffer
  // this.data = '';
  this.emit('destroy');
}