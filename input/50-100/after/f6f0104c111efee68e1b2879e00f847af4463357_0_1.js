function (key) {
			var item = declaration[key];
			var resource_path = directory.replace(/\/$/, '') + key;

			if (item.constructor === Object) {
				level(resource_path, item, routes);
			} else {
				resource_path = resource_path.replace(/\/$/, '') || '/';
				routes.push([ resource_path, item ]);
			}
		}