function TopLevelPage(id, name, href, title) {
	this.id = id;
	this.routePattern = href;
	this.pageTemplateName = id;
	this.name = name;
	this.href = href;
	this.title = title;
	return this;
}