function Cookie(req, options) {
  this.path = '/';
  this.maxAge = null;
  this.httpOnly = true;
  if (options) utils.merge(this, options);
  Object.defineProperty(this, 'req', { value: req });
  this.originalMaxAge = undefined == this.originalMaxAge
    ? this.maxAge
    : this.originalMaxAge;
}