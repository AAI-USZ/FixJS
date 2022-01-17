function(left) {
      if (this.id && this.has_children) {
        this.span = this.build_link($(document.createElement('span')));
        this.span.css('left', left + 'px');
      }
      return this.span;
    }