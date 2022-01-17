function() {
    self.master.emit('death', worker, self)
    delete self.workers[id]
    delete self.master.workers[id]
  }