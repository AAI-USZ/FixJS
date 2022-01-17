function readLine(fd, pos, callback) {
  var buff = new Buffer(1024);

  findPrevEOL(fd, pos, function(pos) {
    WordNetFile.appendLineChar(fd, pos, 0, buff, callback);
  });
}