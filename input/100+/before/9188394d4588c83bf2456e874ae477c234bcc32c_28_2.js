function km_init() {
    IMEController.init();
    IMEFeedback.init();

    this.updateSettings();
    this._events.forEach((function attachEvents(type) {
      window.addEventListener(type, this);
    }).bind(this));

    var self = this;
    for (var key in this.keyboardSettingGroups) {
      (function observeSettings(key) {
        SettingsListener.observe('keyboard.layouts.' + key, false,
          function(value) {
            if (value)
              self.enableSetting(key);
            else
              self.disableSetting(key);
          }
        );
      })(key);
    }

    window.navigator.mozKeyboard.onfocuschange = function(e) {
      var exclusionList = [
        'button', 'checkbox', 'file',
        'image', 'reset', 'submit'
      ];
      if (e.detail.type === 'blur') {
        IMEController.hideIME();
      } else {
        if (exclusionList.indexOf(e.detail.type) === -1)
          IMEController.showIME(e.detail.type);
      }
    };
  }