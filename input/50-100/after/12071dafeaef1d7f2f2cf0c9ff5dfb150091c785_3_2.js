function(left) {

      // If there is a title, then build it.
      if (!this.root && this.title) {
        this.link = this.build_link($(document.createElement('a')));
        this.link.css('marginLeft', left + 'px').text(this.title);
      }

      // Return the link.
      return this.link;
    }