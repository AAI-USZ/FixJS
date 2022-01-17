function view_notFound(template) {
	this.root._response.statusCode = 404;
	this.root._render(template);
}