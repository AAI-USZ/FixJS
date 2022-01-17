function(tofetch, removed) {
  if (tofetch.length == 0) {
    return
  }
  if ($.isFunction(this.options.fetch)) {
    this.options.fetch(tofetch, removed);
  }
}