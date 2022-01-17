function BrowserContext(path, lazy) {
    this.path = path;
    this.lazy = lazy;
    this.cookies = jar.jar;
  }