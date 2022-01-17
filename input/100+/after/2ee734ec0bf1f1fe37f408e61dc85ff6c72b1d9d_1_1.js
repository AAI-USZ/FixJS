function () {
  var mName = 'validate' + helpers.capitalize(this.name);
  if (this[mName]) {
    return this[mName]();
  } else {
    console.log("WARNING: unsupported attribute");
  }
}