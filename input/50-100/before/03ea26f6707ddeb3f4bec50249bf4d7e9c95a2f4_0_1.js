function (bookmark, comment) {
    var Tree = this;
    _(bookmark.paths).each(function (path) {
      Tree.getFolder(path).takeBookmark(bookmark);
    });
    bookmark.commentParser(comment);
    _(bookmark.paths).each(function (chawan) {
      Tree.getFolder(chawan, true).addBookmark(bookmark);
    });
    this.trigger('change');
  }