function (callback) {

    // Make sure the editor isn't already unloaded.
    if (this.eeState.unloaded) {
      throw new Error('Editor isn\'t loaded');
    }

    var self = this
      , editor = window.parent.document.getElementById(self._instanceId);

    editor.parentNode.removeChild(editor);
    self.eeState.loaded = false;
    self.eeState.unloaded = true;
    callback = callback || function () {};
    
    if (self.saveInterval) {
      window.clearInterval(self.saveInterval);
    }
    
    callback.call(this);
    self.emit('unload');
    return self;
  }