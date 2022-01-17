function(tofetch, removed) {
  if ($.isFunction(this.options.fetch)) {
    this.options.fetch(tofetch, removed);
  }
}