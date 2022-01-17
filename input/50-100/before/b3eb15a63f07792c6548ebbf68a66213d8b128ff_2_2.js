function(path) {
    this.response.statusCode = 303;
    this.response.setHeader('Location', path);
    this.cookies.setHeaders();
    this.response.end();
    return false;
  }