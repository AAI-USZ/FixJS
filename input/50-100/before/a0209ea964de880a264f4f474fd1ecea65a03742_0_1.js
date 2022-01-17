function() {
  if(this.paused === false || !this.readable) {
    return;
  }
  
  this.paused = false;
  var self = this;
  if(self.pendingChunk != null) {
    self.currentChunk = self.pendingChunk;
    process.nextTick(function() {
      self._execute();
    });
  } else {
    self.readable = false;
    self.emit("close");    
  }
}