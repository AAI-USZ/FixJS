function () {
    // TODO DEBUG rm
    console.log(this.count);
    if (this.count < this.totalcount) {
      var req, options = {};
      req = new Request();
      // FIXME if (this.lastpolled) { options['after'] = this.lastpolled.toISOString() }
      req.on('success', function (data) {
        this.emit('poll', data);
      }, this);
      req.get(this.endpoint, options);
      this.lastpolled = new Date();
      this.count++;
      setTimeout(this.poll.bind(this), this.interval);
    }
  }