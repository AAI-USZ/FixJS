function() {
    var done,
      _this = this;
    this.lazy = false;
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
  }