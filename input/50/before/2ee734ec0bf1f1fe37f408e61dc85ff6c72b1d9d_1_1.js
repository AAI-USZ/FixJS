function () {
  var mName = 'validate' + helpers.capitalize(this.name);
  if (this[mName]) {
    return this[mName]();
  }
}