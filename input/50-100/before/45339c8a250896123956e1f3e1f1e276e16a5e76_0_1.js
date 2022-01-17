function() {
    var stream = this,
        frame = this.framer.dataFrame(this.id, fin, buffer);

    stream.connection.scheduler.schedule(stream, frame);
    stream.connection.scheduler.tick();

    if (fin) this.close();

    this.unlock();
  }