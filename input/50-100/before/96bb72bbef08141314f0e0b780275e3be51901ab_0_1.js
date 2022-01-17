function km_disableSetting(theKey) {
    var i = this.settingGroups.indexOf(theKey);
    if (i === -1) {
      this.updateSettings();
      return;
    }

    this.settingGroups = [].concat(
      this.settingGroups.slice(0, i),
      this.settingGroups.slice(i + 1, this.settingGroups.length));

    this.updateSettings();
  }