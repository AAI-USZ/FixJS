function(worker) {
      debug('kill worker ' + worker.pid)
      worker.kill()
    }