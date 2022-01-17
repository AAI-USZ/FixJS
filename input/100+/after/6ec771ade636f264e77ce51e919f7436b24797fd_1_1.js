function (instance) {
  var that = this;
  this.heightMethod = ($.browser.mozilla || $.browser.opera) ? "outerHeight" : "height";
  this.instance = instance;
  this.headers = [];
  var position = instance.table.position();
  instance.positionFix(position);
  this.main = $('<div style="position: absolute; top: ' + position.top + 'px; left: ' + position.left + 'px"><table cellspacing="0" cellpadding="0"><thead><tr></tr></thead><tbody></tbody></table></div>');
  this.instance.container.on('datachange.handsontable', function (event, changes) {
    setTimeout(function () {
      that.dimensions(changes);
    }, 10);
  });
  this.instance.container.append(this.main);
}