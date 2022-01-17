function() {
  var field = this.getElement();

  this.installStyles();
  this.startChangeEvents();
  this.logger.info('Dispatching load ' + this.id);
  this.dispatchEvent(goog.editor.Field.EventType.LOAD);
}