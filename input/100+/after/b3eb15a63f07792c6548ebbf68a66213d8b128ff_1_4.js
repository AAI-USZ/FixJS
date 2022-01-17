function(_super) {

    __extends(Chunk, _super);

    Chunk.prototype.events = ['prepare', 'loading', 'ready', 'error', 'build', 'complete', 'render', 'halt'];

    function Chunk() {
      Chunk.__super__.constructor.apply(this, arguments);
      this.errors = [];
      this.waiting = 0;
    }

    Chunk.prototype.emit = function(event) {
      var _i, _len, _ref, _results;
      if (this.status !== 'halt') {
        Chunk.__super__.emit.apply(this, arguments);
      }
      if (event === 'halt') {
        _ref = this.events;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          _results.push(this.removeAllListeners(event));
        }
        return _results;
      }
    };

    Chunk.prototype.load = function(context) {
      var _this = this;
      this.context = context;
      this.cookies = this.context.cookies;
      this.go = function() {
        return _this.context.go.apply(_this.context, arguments);
      };
      if (!this.status) {
        setTimeout(this.wait(), 1);
        return this.emit('prepare', this.options);
      }
    };

    Chunk.prototype.toString = function() {
      return this.html;
    };

    Chunk.prototype.error = function() {
      var args;
      args = Array.prototype.slice.call(arguments);
      return this.errors.push(args);
    };

    Chunk.prototype.ready = function() {
      if (!this.html) {
        this.emit('build', this.errors);
        return this.emit('complete');
      }
    };

    Chunk.prototype.wait = function(fn) {
      var _this = this;
      if (!this.waiting++) {
        this.emit('loading');
      }
      return function() {
        if (fn) {
          fn.apply(_this, arguments);
        }
        if (!--_this.waiting && _this.status !== 'abort') {
          return _this.emit('ready');
        }
      };
    };

    Chunk.prototype.loadChunk = function(chunk, options) {
      if (typeof chunk === 'function') {
        chunk = new chunk(options);
      } else if (typeof chunk === 'string') {
        chunk = new soma.chunks[chunk](options);
      }
      if (!chunk.html) {
        chunk.on('complete', this.wait());
        chunk.load(this.context);
      }
      return chunk;
    };

    return Chunk;

  }