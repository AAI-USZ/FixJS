function() {

    if (this._windowCreatedListener) {
      global.screen.get_display().disconnect(this._windowCreatedListener);
      this._windowCreatedListener = 0;
    }

    let size = this._bindings.length;
    // TODO: remove handlers added by keybindings_set_custom_handler
    //for(let i = 0; i<size; i++) {
    //    this._shellwm.disconnect(this._keyBindingHandlers[this._bindings[i]]);
    //}

    this._settings.destroy();
  }