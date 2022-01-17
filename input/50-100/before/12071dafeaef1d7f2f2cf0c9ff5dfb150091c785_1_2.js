function(left) {
      if (this.id && this.title) {
        this.link = this.build_link($(document.createElement('a')));
        this.link.css('marginLeft', left + 'px').text(this.title);
      }
      return this.link;
    }