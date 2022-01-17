function Cookie(options) {
  this.path = '/';
  this.maxAge = null;
  this.httpOnly = true;
  if (options) utils.merge(this, options);
  this.originalMaxAge = undefined == this.originalMaxAge
    ? this.maxAge
    : this.originalMaxAge;
}