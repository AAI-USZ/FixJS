function view_notFound(template) {
	this.root._response.statusCode = 404;
	// kill all child views so that the route renders immediately
	this.root._child_views = {};
	this.root.render(template);
}