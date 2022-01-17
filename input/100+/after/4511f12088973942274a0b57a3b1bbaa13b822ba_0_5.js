function () {
  this.div = $('<div style="position: absolute; top: 0px; left: 0px; display: none; z-index: 10000"></div>');
  this.div[0].annotateHide = true;
  var inner = $('<div></div>')
    .attr('style', styles.base + styles.border);
  this.text = $('<textarea style="width: 100%; height: 3em;"></textarea>');
  inner.append(this.text);
  inner.append($('<br>'));
  this.saveButton = $('<button type="button">Save</button>')
    .attr('style', styles.button)
    .appendTo(inner);
  this.clearButton = $('<button type="button">Clear/Cancel</button>')
    .attr('style', styles.button)
    .appendTo(inner);
  this.saveButton.click(this.save.bind(this));
  this.clearButton.click(this.clear.bind(this));
  this.div.append(inner);
  $('body').append(this.div);
}