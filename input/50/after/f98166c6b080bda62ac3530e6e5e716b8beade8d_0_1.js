function (opts) {
  this.postData = merge(this.postData || {}, opts || {});
  return this;
}