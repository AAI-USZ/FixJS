function(path) {
    if (this.chunk) {
      this.chunk.emit('halt');
      this.chunk = null;
    }
    this.response.statusCode = 303;
    this.response.setHeader('Location', path);
    this.cookies.setHeaders();
    this.response.end();
    return false;
  }