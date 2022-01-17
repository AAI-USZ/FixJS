function(data) {
			var config = plugin.component.config;
			data.plugins = config.get("nestedPlugins", []);
			data.parent = config.getAsHash();

			// copy default field values from parent control
			Echo.Utils.foldl(data, plugin.component.getDefaultConfig(),
				function(value, acc, key) {
					acc[key] = config.get(key);
				}
			);
			return (new Echo.Configuration(data, plugin.config.get())).getAsHash();
		}