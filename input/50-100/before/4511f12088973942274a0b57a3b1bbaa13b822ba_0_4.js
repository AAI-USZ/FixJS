function (pos, selector) {
  this.div[0].style.top = pos.top + 'px';
  this.div[0].style.left = pos.left + 'px';
  this.div.show();
  this.selector = selector;
  this.text.focus();
}