function(html, parse) {
    if (parse) {
      html = this.parent.parse(html);
    }
    if (this.element.value !== html) {
	    this.parent.fire('change:textarea');
	    this.element.value = html;
    }
  }