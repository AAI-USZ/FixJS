function Zlib(opts, mode) {
  this._opts = opts = opts || {};
  this._queue = [];
  this._processing = false;
  this._ended = false;
  this.readable = true;
  this.writable = true;
  this._flush = binding.Z_NO_FLUSH;

  if (opts.chunkSize) {
    if (opts.chunkSize < exports.Z_MIN_CHUNK ||
        opts.chunkSize > exports.Z_MAX_CHUNK) {
      throw new Error('Invalid chunk size: ' + opts.chunkSize);
    }
  }

  if (opts.windowBits) {
    if (opts.windowBits < exports.Z_MIN_WINDOWBITS ||
        opts.windowBits > exports.Z_MAX_WINDOWBITS) {
      throw new Error('Invalid windowBits: ' + opts.windowBits);
    }
  }

  if (opts.level) {
    if (opts.level < exports.Z_MIN_LEVEL ||
        opts.level > exports.Z_MAX_LEVEL) {
      throw new Error('Invalid compression level: ' + opts.level);
    }
  }

  if (opts.memLevel) {
    if (opts.memLevel < exports.Z_MIN_MEMLEVEL ||
        opts.memLevel > exports.Z_MAX_MEMLEVEL) {
      throw new Error('Invalid memLevel: ' + opts.memLevel);
    }
  }

  if (opts.strategy) {
    if (opts.strategy != exports.Z_FILTERED &&
        opts.strategy != exports.Z_HUFFMAN_ONLY &&
        opts.strategy != exports.Z_RLE &&
        opts.strategy != exports.Z_FIXED &&
        opts.strategy != exports.Z_DEFAULT_STRATEGY) {
      throw new Error('Invalid strategy: ' + opts.strategy);
    }
  }

  this._binding = new binding.Zlib(mode);

  var self = this;
  this._binding.onerror = function(message, errno) {
    // there is no way to cleanly recover.
    // continuing only obscures problems.
    self._binding = null;
    self._hadError = true;
    self._queue.length = 0;
    self._processing = false;

    var error = new Error(message);
    error.errno = errno;
    error.code = exports.codes[errno];
    self.emit('error', error);
  };

  this._binding.init(opts.windowBits || exports.Z_DEFAULT_WINDOWBITS,
                     opts.level || exports.Z_DEFAULT_COMPRESSION,
                     opts.memLevel || exports.Z_DEFAULT_MEMLEVEL,
                     opts.strategy || exports.Z_DEFAULT_STRATEGY);

  this._chunkSize = opts.chunkSize || exports.Z_DEFAULT_CHUNK;
  this._buffer = new Buffer(this._chunkSize);
  this._offset = 0;
  var self = this;
}