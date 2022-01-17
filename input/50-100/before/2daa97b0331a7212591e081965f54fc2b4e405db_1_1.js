function () {
  if (this.instance.curScrollTop === 0) {
    this.ths.css('borderBottomWidth', 0);
  }
  else if (this.instance.lastScrollTop === 0) {
    this.ths.css('borderBottomWidth', '1px');
  }
}