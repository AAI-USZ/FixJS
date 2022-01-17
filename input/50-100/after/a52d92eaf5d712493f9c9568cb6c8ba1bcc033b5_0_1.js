function report (total, elapsed) {
    var stats = {
        iterations: total
      , elapsed: elapsed
      , title: self.title
      , ops: Math.round(total / elapsed * 1000)
    };

    self.emit('end', stats);
    cb(stats);
  }