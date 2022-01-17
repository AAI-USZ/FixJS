function km_disableSetting(theKey) {
    var i = this.settingGroups.indexOf(theKey);
    if (i === -1) {
      this.updateSettings();
      return;
    }

    this.settingGroups.splice(i, 1);
    this.updateSettings();
  }