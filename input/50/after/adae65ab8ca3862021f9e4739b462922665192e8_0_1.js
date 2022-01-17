function(err){
    debug('socket-error',err)
    s.destroy()
    self.sockets.splice(self.sockets.indexOf(s),1)
  }