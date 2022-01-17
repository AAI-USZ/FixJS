function(dest) {
  this.piped = true;
  this.dest = dest;
  this.on('data', function(data) {
    this.dest.write(data);
  });
}