function(selector, callback) {
      SC.RunLoop.begin();
      this.set('selector', selector);
      SC.RunLoop.end();
      var page = this;
      callback.apply(page, [page]);
    }