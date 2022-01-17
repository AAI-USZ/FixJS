function () {
  if (this.filled) {
    throw new Error('can not call .only() after toArray or toValue is called');
  }

  this.first = true;
  return this;
}