function () {
  var self = this;
  if (this.div) {
    this.div.show();
    return;
  }
  this.viewState = 'small';
  this.div = $('<div></div>');
  this.div[0].annotateHide = true;
  this.div[0].annotation = true;
  this.div.css({
    position: 'absolute',
    zIndex: '9990'
  });
  var inner = $('<div></div>').attr('style', 'padding: 0.3em;' + styles.base + styles.border);
  inner.html(this.parseText(this.repr.text));
  this.div.append(inner);
  this.controlDiv = $('<div></div>');
  this.div.append(this.controlDiv);
  this.deleteButton = $('<button type="button">Delete</button>').attr('style', styles.button);
  this.controlDiv.append(this.deleteButton);
  this.deleteButton.click(function () {
    self.deleteFromServer();
  });
  this.div.click(function () {
    self.expand();
  });
  if (this.repr.selector.click) {
    var click = this.repr.selector.click;
    var el = $('#' + click.element);
    var pos = getElementPosition(el);
    pos = {top: pos.top + click.offsetTop,
           left: pos.left + click.offsetLeft};
  } else {
    this.rangePosition = showAnnotationRange(this.repr.selector.range);
    var el = this.rangePosition.elements[this.rangePosition.elements.length-1];
    var pos = getElementPosition($(el));
    pos = {top: pos.top + el.offsetHeight,
           left: pos.left};
  }
  this.position(pos);
  $('body').append(this.div);
}