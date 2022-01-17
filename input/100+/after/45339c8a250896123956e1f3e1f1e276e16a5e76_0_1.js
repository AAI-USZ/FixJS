function _writeData(fin, buffer) {
  var len;
  if (this.framer.version == 3) {
    if (this._transferWindowSize <= 0) {
      this._transferWindowBuffer.push([fin, buffer]);
      return;
    }
    len = Math.min(this._transferWindowSize, buffer.length);
    if (len < buffer.length) {
      this._transferWindowBuffer.push([fin, buffer.slice(len)]);
      fin = false;
    }
    this._transferWindowSize -= len;
  }

  this.lock(function() {
    var stream = this,
        frame = this.framer.dataFrame(this.id, fin, buffer.slice(0, len));

    stream.connection.scheduler.schedule(stream, frame);
    stream.connection.scheduler.tick();

    if (fin) this.close();

    this.unlock();
  });
}