function (request, response) {
	var host_levels = request.getHostLevels();

	var host = host_levels[0];
	var hostname = host_levels.join('.');
	var method = request.getMethod();
	var search = request.getSearch();
	var pathname = request.getPathname();
	var params = request.getQuery();

	var log_string =
		colors.regular.BLUE + method + ' ' +
		colors.intense.BLACK + hostname +
		colors.DEFAULT + pathname +
		colors.regular.CYAN + search +
		colors.DEFAULT;

	var route = this.getRouteByHostAndPathname_(host, pathname);
	if (!route) {
		log(log_string +
			colors.regular.PURPLE + ' -> ' +
			colors.intense.RED + '404' +
			colors.DEFAULT + ' [no route]');
		response.end(404);
		return;
	}

	if (route.params) {
		Object.keys(route.params).forEach(function (key) {
			params[key] = route.params[key];
		});
	}

	var target = (typeof route === 'number') ? route : route.target;

	switch (typeof target) {
		case 'number':
			log(log_string +
				colors.regular.PURPLE + ' -> ' +
				colors.intense.RED + target +
				colors.DEFAULT);
			response.end(target);
			return;

		case 'string':
			log(log_string +
				colors.regular.PURPLE + ' -> ' +
				colors.intense.GREEN + target +
				colors.DEFAULT);
			if (target[0] === '/') {
				this.redirect_(response, target);
			} else {
				this.routeToControllerAction_(request, response, target, params);
			}
			return;

		default:
			var relative = path.relative('.' + route.pathname, '.' + pathname);
			if (relative.substr(0, 2) === '..') {
				log(log_string + ' -> 400');
				response.end(400);
				return;
			}

			var name = target.constructor.name;
			log(log_string +
				colors.regular.PURPLE + ' -> ' +
				colors.intense.BLACK + '[' + (name || 'type handler') + ']' +
				colors.DEFAULT);
			request.setPathname('/' + relative);
			target.handle(request, response, params);
	}
}