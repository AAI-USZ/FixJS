function(_super) {

  __extends(BrowserContext, _super);

  BrowserContext.name = 'BrowserContext';

  function BrowserContext(path, lazy) {
    this.path = path;
    this.lazy = lazy;
    this.cookies = jar.jar;
  }

  BrowserContext.prototype.begin = function() {
    var result, results, _i, _len;
    results = soma.router.run(this.path, this);
    if (!results.length) {
      throw new Error('No routes matched');
    } else {
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        if (result instanceof soma.Chunk) {
          this.send(result);
        }
      }
    }
  };

  BrowserContext.prototype.send = function(chunk) {
    if (!(chunk instanceof soma.Chunk)) {
      throw new Error('Must send chunks on the client');
    } else if (this.chunk) {
      throw new Error('Cannot send multiple chunks');
    }
    this.chunk = chunk;
    while (this.chunk.meta) {
      this.chunk = this.chunk.meta();
    }
    this.chunk.load(this);
    if (!this.lazy) {
      this.render();
    }
  };

  BrowserContext.prototype.render = function() {
    var done,
      _this = this;
    if (!this.chunk) {
      throw new Error('No chunk loaded');
    }
    done = function() {
      _this.chunk.emit('render');
      $('body').html(_this.chunk.html);
      return $.enhance(_this);
    };
    if (this.chunk.status === 'complete') {
      done();
    } else {
      this.chunk.on('complete', done);
    }
  };

  BrowserContext.prototype.go = function(path, replace) {
    if (history.pushState) {
      if (replace) {
        history.replaceState(true, '', path);
      } else {
        history.pushState(true, '', path);
      }
      if (this.chunk) {
        this.chunk.emit('halt');
      }
      soma.load(path);
    } else {
      document.location = path;
    }
  };

  return BrowserContext;

}