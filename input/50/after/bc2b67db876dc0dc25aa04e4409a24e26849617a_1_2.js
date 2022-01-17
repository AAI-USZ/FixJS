function(html, action, anchor) {
	html = this.substitute($.isFunction(html) ? html() : html);
	this.component.extendTemplate.call(this.component, html, action, anchor);
}