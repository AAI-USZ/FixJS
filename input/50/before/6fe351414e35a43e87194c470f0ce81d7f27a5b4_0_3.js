function(worker) {
      console.log('kill worker ' + worker.pid)
      worker.kill()
    }