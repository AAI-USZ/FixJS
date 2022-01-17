function Spinner(o) {
    if (!this.spin) return new Spinner(o);
    this.opts = merge(o || {}, Spinner.defaults, defaults);
  }