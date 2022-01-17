function(lang) {
    var icons = this.icons;
    for (var origin in icons) {
      icons[origin].translate(lang);
    }
  }