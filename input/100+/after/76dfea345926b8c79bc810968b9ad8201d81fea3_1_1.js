function Connection(socket, pool, options) {
  process.EventEmitter.call(this);

  var self = this;

  this._closed = false;

  this.pool = pool;
  var pair = pool.get(socket.npnProtocol);

  this.deflate = pair.deflate;
  this.inflate = pair.inflate;

  // Init streams list
  this.streams = {};
  this.streamsCount = 0;
  this.pushId = 0;
  this.goaway = false;

  this.framer = null;

  // Data transfer window defaults to 64kb
  this.transferWindowSize = options.transferWindowSize;

  // Initialize parser
  this.parser = spdy.parser.create(this, this.deflate, this.inflate);
  this.parser.on('frame', function (frame) {
    if (this._closed) return;

    var stream;

    // Create new stream
    if (frame.type === 'SYN_STREAM') {
      self.streamsCount++;

      stream = self.streams[frame.id] = new Stream(self, frame);

      // If we reached stream limit
      if (self.streamsCount > options.maxStreams) {
        stream.once('error', function() {});
        // REFUSED_STREAM
        stream.rstCode = 3;
        stream.destroy(true);
      } else {
        self.emit('stream', stream);

        stream.init();
      }
    } else {
      if (frame.id) {
        // Load created one
        stream = self.streams[frame.id];

        // Fail if not found
        if (stream === undefined) {
          if (frame.type === 'RST_STREAM') return;
          console.log("frame not found: ", frame);
          self.write(self.framer.rstFrame(frame.id, 2));
          return;
        }
      }

      // Emit 'data' event
      if (frame.type === 'DATA') {
        if (frame.data.length > 0){
          if (stream.closedBy.client) {
            stream.rstCode = 2;
            stream.emit('error', 'Writing to half-closed stream');
          } else {
            stream._read(frame.data);
          }
        }
      // Destroy stream if we was asked to do this
      } else if (frame.type === 'RST_STREAM') {
        stream.rstCode = 0;
        if (frame.status === 5) {
          // If client "cancels" connection - close stream and
          // all associated push streams without error
          stream.pushes.forEach(function(stream) {
            stream.close();
          });
          stream.close();
        } else {
          // Emit error on destroy
          stream.destroy(new Error('Received rst: ' + frame.status));
        }
      // Respond with same PING
      } else if (frame.type === 'PING') {
        self.write(self.framer.pingFrame(frame.pingId));
      } else if (frame.type === 'SETTINGS') {
        self.setDefaultTransferWindow(frame.settings);
      } else if (frame.type === 'GOAWAY') {
        self.goaway = frame.lastId;
      } else if (frame.type === 'WINDOW_UPDATE') {
        // console.log("window update ("+ frame.id  +"): " + frame.delta);
        stream.drainWindow(frame.delta);
      } else {
        console.error('Unknown type: ', frame.type);
      }
    }

    // Handle half-closed
    if (frame.fin) {
      // Don't allow to close stream twice
      if (stream.closedBy.client) {
        stream.rstCode = 2;
        stream.emit('error', 'Already half-closed');
      } else {
        stream.closedBy.client = true;
        stream.handleClose();
      }
    }
  });

  this.parser.on('framer', function(framer) {
    // Generate custom settings frame and send
    self.write(
      framer.maxStreamsFrame(options.maxStreams)
      // framer.windowSizeFrame(options.transferWindowSize)
    );
  });

  // Propagate parser errors
  this.parser.on('error', function(err) {
    self.emit('error', err);
  });

  // Initialize scheduler
  this.scheduler = spdy.scheduler.create(this);

  // Store socket and pipe it to parser
  this.socket = socket;

  socket.pipe(this.parser);

  // 2 minutes socket timeout
  socket.setTimeout(2 * 60 * 1000);
  socket.once('timeout', function() {
    socket.destroy();
  });

  // Allow high-level api to catch socket errors
  socket.on('error', function(e) {
    self.emit('error', e);
  });

  socket.on('close', function() {
    self._closed = true;
    pool.put(socket.npnProtocol, pair);
  });

  socket.on('drain', function () {
    self.emit('drain');
  });
}