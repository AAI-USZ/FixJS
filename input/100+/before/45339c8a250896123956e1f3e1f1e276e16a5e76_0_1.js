function _writeData(fin, buffer) {
  if (this.framer.version == 3) {
    if (this._transferWindowSize > 0)
      this._transferWindowSize -= buffer.length;

    if (this._transferWindowSize < 0) {
      this._transferWindowBuffer.push([fin, buffer]);
      return;
    }
  }

  this.lock(function() {
    var stream = this,
        frame = this.framer.dataFrame(this.id, fin, buffer);

    stream.connection.scheduler.schedule(stream, frame);
    stream.connection.scheduler.tick();

    if (fin) this.close();

    this.unlock();
  });
}