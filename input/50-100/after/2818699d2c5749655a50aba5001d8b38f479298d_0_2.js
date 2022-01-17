function(html, parse) {
    if (parse) {
      html = this.parent.parse(html);
    }
	this.element.value = html;
	this.parent.fire('change:textarea', html);
  }