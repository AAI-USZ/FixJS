function Cache(file, options) {
  this.options = copy(options);
  this.options.maxAge || (this.options.maxAge = 300);
  this.file = file;
  this.mime = mime.lookup(this.file);
  this.buf = fs.readFileSync(file);
  if (/^text\//.exec(this.mime)) {
    this.gzip();
  }
  this.buildHeaders();
}