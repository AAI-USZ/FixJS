function(opts, cb) {
    opts || (opts = {});
    this.app_id     = opts.app_id;
    this.logging    = (window.location.toString().indexOf('debug=1') > 0)  || opts.logging || this.logging;
    this.cookies    = opts.cookies  || this.cookies;
    this.host       = opts.host     || this.host;
    return this;
  }