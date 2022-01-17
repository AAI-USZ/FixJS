function places_addBookmark(uri, title, callback) {
    if (!title)
      title = uri;
    var bookmark = {
      uri: uri,
      title: title,
      timestamp: new Date().getTime()
    };
    this.addPlace(uri, (function() {
      this.db.saveBookmark(bookmark, callback);
    }).bind(this));
  }