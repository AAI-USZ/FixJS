function(){
  var self = this;
  this._overlay = ui
    .overlay({ closable: true })
    .on('hide', function(){
      self.closedOverlay = true;
      self.emit('close');
      self.hide();
    });
  return this;
}