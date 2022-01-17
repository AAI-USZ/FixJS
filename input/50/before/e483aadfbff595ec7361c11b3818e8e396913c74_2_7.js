function(newContent) {
      return this.each(function() {
        $(this).wrapAll($(newContent)[0].cloneNode(false));
      });
    }