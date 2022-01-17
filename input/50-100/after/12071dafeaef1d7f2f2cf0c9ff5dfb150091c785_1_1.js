function(left) {

      // If we are not root, and we have children, show a +/- symbol.
      if (!this.root && this.has_children) {
        this.span = this.build_link($(document.createElement('span')));
        this.span.css('left', left + 'px');
      }
      return this.span;
    }