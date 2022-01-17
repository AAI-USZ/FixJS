function set(key, value) {
  var known = true;

  if (this.options.values && !Array.isArray(value) &&
      typeof value === 'string') {
    known = this.options.values[key].some(function(val) {
      return value === utils.stringify(val);
    });
  }

  if (Array.isArray(value)) {
    this.states.high[key] = value;
    delete this.states.low[key];
  } else {
    this.states.high[key] = [known ? value : null];
    this.states.low[key] = known ? value : null;
  }
}