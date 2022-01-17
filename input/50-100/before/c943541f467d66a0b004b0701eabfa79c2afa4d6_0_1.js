function(event) {
  event.stopPropagation();

  var list = [];
  for (var i = 0; i < 12; i++) {
    list.push(this.symbols_.MONTHS[i]);
  }
  this.createMenu_(this.elMonth_, list, this.handleMonthMenuClick_,
      this.symbols_.MONTHS[this.activeMonth_.getMonth()]);
}