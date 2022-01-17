function (fn) {
  // throw if more search requests are made
  if (this.onlySearch) {
    throw new Error('can not add search criterias after .toArray or .toValue was called with .only');
  }

  this.searchList.push(fn);
  return this;
}