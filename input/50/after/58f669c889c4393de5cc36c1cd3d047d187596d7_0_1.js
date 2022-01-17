function GitHubModel() {
	var core = new Model();
	core.resourcesBase = 'https://api.github.com';
	core.resource = 'users/yiannisk';
	core.mapMethod('repos', true, 'jsonp');
	return core;
}