function(key, value) {
    var list = this.get(key) || [];
    list.push(value);
    return this.set(key, list);
  }