function() {
    console.log('worker id=' + id + ' died')
    delete self.workers[id]
    delete self.master.workers[id]
    self.master.emit('death', worker, self)
  }