function(channel) {
			var args = [].slice.call(arguments, 1),
				el = args[0],
				file = lang.decamelize(channel);

			mediator.publish.apply(mediator, [channel, 'unload'].concat(args));
			// Remove all modules under a widget path (e.g widgets/todos)
			mediator.unload(baseUrl + file);

			if (el) {
				// Empty markup associated with the module
				$(el).html('');
			}
		}