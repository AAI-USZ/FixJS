function(cb) {
  var self = this;
  //error('Updating ' + self.url);
  self.withLock(function(done) {
    self.gitExec(['remote', 'update'], done);
  }, cb);
}