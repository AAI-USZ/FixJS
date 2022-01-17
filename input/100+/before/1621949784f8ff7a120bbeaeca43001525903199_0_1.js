function() {
			for (var i=0; i < services.length; i++) {
				try {
					// Don't trigger a plugin load only to call updated(); pluginLoadedListener handles that case.
					var pluginUrl = serviceRefs[i].getProperty('__plugin__'); //$NON-NLS-0$
					var plugin = pluginUrl && pluginRegistry.getPlugin(pluginUrl);
					if (!pluginUrl || (plugin && plugin.isLoaded())) {
						services[i].updated(properties);
					}
				} catch(e) {
					if (console) {
						console.log(e);
					}
				}
			}
		}