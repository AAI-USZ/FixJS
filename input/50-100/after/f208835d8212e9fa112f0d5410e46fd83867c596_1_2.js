function localize() {
    // set the 'lang' and 'dir' attributes to <html> when the page is translated
    document.documentElement.lang = navigator.mozL10n.language.code;
    document.documentElement.dir = navigator.mozL10n.language.direction;

    // switch RTL-sensitive methods accordingly
    dirCtrl = getDirCtrl();

    // translate each page
    var total = pageHelper.total();
    for (var i = 0; i < total; i++) {
      pages.list[i].translate();
    }
  }