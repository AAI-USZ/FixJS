function execute(state, data, callback) {
  if (state.type === 'frame-head') {
    var header = state.header = spdy.protocol.generic.parseHeader(data);

    // Lazily create framer
    if (!this.framer && header.control) {
      this.createFramer(header.version);
    }

    state.type = 'frame-body';
    callback(null, header.length);
  } else if (state.type === 'frame-body') {
    var self = this;

    // Data frame
    if (!state.header.control) {
      this.connection.socket.setNoDelay(true);

      if (this.framer.version >= 3) {
        this.connection.write(
          this.framer.windowUpdateFrame(state.header.id, 512)
        );
      }

      this.connection.socket.setNoDelay(false);

      return onFrame(null, {
        type: 'DATA',
        id: state.header.id,
        fin: (state.header.flags & 0x01) === 0x01,
        compressed: (state.header.flags & 0x02) === 0x02,
        data: data
      });
    } else {
    // Control frame
      this.framer.execute(state.header, data, onFrame);
    }

    function onFrame(err, frame) {
      if (err) return callback(err);

      self.emit('frame', frame);

      state.type = 'frame-head';
      callback(null, 8);
    };
  }
}