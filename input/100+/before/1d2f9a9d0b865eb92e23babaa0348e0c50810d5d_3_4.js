function Stream(connection, frame) {
  var self = this;
  stream.Stream.call(this);

  this.connection = connection;
  this.framer = connection.framer;

  this.ondata = this.onend = null;

  // RST_STREAM code if any
  this.rstCode = 1;
  this._destroyed = false;

  this.closedBy = {
    client: false,
    server: false
  };

  // Lock data
  this.locked = false;
  this.lockBuffer = [];

  // Store id
  this.id = frame.id;

  // Store priority
  this.priority = frame.priority;

  // Array of push streams associated to that one
  this.pushes = [];

  this._paused = false;
  this._buffer = [];

  this._transferWindowSize = connection.transferWindowSize;
  this._initialTransferWindowSize = connection.transferWindowSize;

  this._transferWindowBuffer = [];

  // Create compression streams
  this.deflate = connection.deflate;
  this.inflate = connection.inflate;

  // Store headers
  this.headers = frame.headers;

  this.frame = frame;

  this.readable = this.writable = true;
}