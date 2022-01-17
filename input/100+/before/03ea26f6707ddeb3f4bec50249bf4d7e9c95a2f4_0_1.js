function (texts) {
    var array = texts.split('\n'), l = array.length / 4, bookmarks = new Array(l);
    var Tree = this;
    for (var i = 0; i < l; i++) {
      bookmarks[i] = this.Bookmark.create(array[i * 3], array[1 + i * 3], array[2 + i * 3], array[i + l * 3]);
    }
    this.allBookmark = bookmarks;
    _(bookmarks).each(function (bookmark) {
      if (bookmark.paths.length) {
        _(bookmark.paths).each(function (chawan) {
          Tree.getFolder(chawan, true).addBookmark(bookmark);
        });
      } else {// dont have chawan
        bookmark.paths.push([]);
        Tree.root.addBookmark(bookmark);
      }
    });
    this.root.getBookmarkCount();
    (function (folder) {
      _(folder.folders).each(arguments.callee);
      folder.sortFolder();
    })(this.root);
    this.trigger('change');

  }