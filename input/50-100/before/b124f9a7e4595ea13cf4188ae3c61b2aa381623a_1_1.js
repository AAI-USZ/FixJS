function(value) {
  if (this.stringifyProperty != null) {
    return value[this.stringifyProperty];
  }
  var name = null;
  var lookup = this.getLookup();
  lookup.some(function(item) {
    if (item.value === value) {
      name = item.name;
      return true;
    }
    return false;
  }, this);
  return name;
}