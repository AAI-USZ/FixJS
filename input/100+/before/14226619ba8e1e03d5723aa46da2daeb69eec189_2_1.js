function shortcutHandler(e) {
      if (e.keyCode == self.settings.shortcut.modifier) { isMod = true } // check for modifier press(default is alt key), save to var
      if (e.keyCode == 17) { isCtrl = true } // check for ctrl/cmnd press, in order to catch ctrl/cmnd + s

      // Check for alt+p and make sure were not in fullscreen - default shortcut to switch to preview
      if (isMod === true && e.keyCode == self.settings.shortcut.preview && !self.eeState.fullscreen) {
        e.preventDefault();
        self.preview();
        isMod = false;
      }
      // Check for alt+o - default shortcut to switch back to the editor
      if (isMod === true && e.keyCode == self.settings.shortcut.edit) {
        e.preventDefault();
        if (!self.eeState.fullscreen) {
          self.edit();
        }
        isMod = false;
      }
      // Check for alt+f - default shortcut to make editor fullscreen
      if (isMod === true && e.keyCode == self.settings.shortcut.fullscreen) {
        e.preventDefault();
        _goFullscreen(fsElement);
        isMod = false;
      }

      // When a user presses "esc", revert everything!
      if (e.keyCode == 27 && self.eeState.fullscreen) {
        if (!document.body.webkitRequestFullScreen) {
          _exitFullscreen(fsElement);
        }
      }

      // Check for ctrl + s (since a lot of people do it out of habit) and make it do nothing
      if (isCtrl === true && e.keyCode == 83) {
        self.save();
        e.preventDefault();
        isCtrl = false;
      }

      // Do the same for Mac now (metaKey == cmd).
      if (e.metaKey && e.keyCode == 83) {
        self.save();
        e.preventDefault();
      }

    }