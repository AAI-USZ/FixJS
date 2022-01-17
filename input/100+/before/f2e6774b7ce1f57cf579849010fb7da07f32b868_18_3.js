  get shortcutsBackground() {
    delete this.shortcutsBackground;
    var id = 'contacts-shortcuts-background';
    return this.shortcutsBackground = document.getElementById(id);
  },
