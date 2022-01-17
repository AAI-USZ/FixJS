function () {
  if (this.instance.curScrollLeft === 0) {
    this.ths.css('borderRightWidth', 0);
  }
  else if (this.instance.lastScrollLeft === 0) {
    this.ths.css('borderRightWidth', '1px');
  }
}