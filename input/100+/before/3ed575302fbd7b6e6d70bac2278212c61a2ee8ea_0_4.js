function() {

    if (this._windowCreatedListener) {
      global.screen.get_display().disconnect(this._windowCreatedListener);
      this._windowCreatedListener = 0;
    }

    let size = this._bindings.length;
    for(let i = 0; i<size; i++) {
        this._shellwm.disconnect(this._keyBindingHandlers[this._bindings[i]]);
    }

    // destroy the settingsButton/Menu. user may have changed the config during runtime
    if (this._settingsButton) {
      this._settingsButton.actor.get_parent().remove_actor(this._settingsButton.actor);
      this._settingsButton.destroy();
      this._settingsButton = null;
    } else if (this._settingsMenu) {
      this._settingsMenu.actor.get_parent().remove_actor(this._settingsMenu.actor);
      this._settingsMenu.destroy();
      this._settingsMenu = null;
    }

    this._settings.destroy();
  }