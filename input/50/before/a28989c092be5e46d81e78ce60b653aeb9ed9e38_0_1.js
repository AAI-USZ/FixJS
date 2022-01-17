function(selector, callback) {
      this.set('selection', selector);
      var page = this;
      callback.apply(page, [page]);
    }