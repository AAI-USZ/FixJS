function(done) {
      var bookmark = {
        uri: 'http://mozilla.org/test1',
        title: 'Mozilla',
        timestamp: new Date().valueOf()
      };
      Places.db.saveBookmark(bookmark, function() {
        done();
      });
    }