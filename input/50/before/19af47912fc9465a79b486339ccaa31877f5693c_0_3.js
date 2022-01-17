function(sha1, cb) {
  this.gitExec(['cat-file', '-p', sha1], cb);
}