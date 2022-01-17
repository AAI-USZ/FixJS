function() {
  var field = this.getElement();

  // Apply workaround className if necessary, see goog.editor.Field constructor
  // for more details.
  if (this.workaroundClassName_) {
    goog.dom.classes.add(field, this.workaroundClassName_);
  }

  this.installStyles();
  this.startChangeEvents();
  this.logger.info('Dispatching load ' + this.id);
  this.dispatchEvent(goog.editor.Field.EventType.LOAD);
}