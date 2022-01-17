function() {
        this.list.each($.proxy(this.addOne, this));
      }