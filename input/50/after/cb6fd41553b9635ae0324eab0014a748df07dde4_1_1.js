function() {
        this.library.each($.proxy(this.addOne, this));
      }