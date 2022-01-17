function(data) {
			var config = plugin.component.config;
			data.appkey = config.get("appkey", "");
			data.plugins = config.get("nestedPlugins", []);
			data.parent = config.getAsHash();
			data.apiBaseURL = config.get("apiBaseURL");
			return (new Echo.Configuration(data, plugin.config.get())).getAsHash();
		}